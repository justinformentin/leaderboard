import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import TextField from '@material-ui/core/TextField'

import { CREATE_PLAYER, PLAYERS_QUERY } from '../gql'

export default class CreatePlayer extends Component {
	constructor() {
		super()
		this.state = {
			firstname: '',
			lastname: '',
			score: ''
		}
	}

	onSumbit = async (e, createPlayer) => {
		let { firstname, lastname, score } = this.state
		if (e.key !== 'Enter' || firstname === '' || lastname === '' || score === '') return

		await createPlayer({
			variables: {
				firstname,
				lastname,
				score
			}
		})
	}

	render() {
		let { firstname, lastname, score } = this.state
		return (
			<Mutation
				mutation={CREATE_PLAYER}
				update={(cache, { data: { createPlayer } }) => {
					let { players } = cache.readQuery({ query: PLAYERS_QUERY })
					if (!players) players = []

					cache.writeQuery({
						query: PLAYERS_QUERY,
						data: { players: players.concat([createPlayer]) }
					})
					this.setState({
						firstname: '',
						lastname: '',
						score: ''
					})
				}}
			>
				{createPlayer => (
					<form onKeyPress={e => this.onSumbit(e, createPlayer)} noValidate autoComplete="off">
						<TextField
							label="FirstName"
							value={firstname}
							onChange={e => this.setState({ firstname: e.target.value })}
							margin="normal"
							required
						/>
						<TextField
							required
							label="Lastname"
							value={lastname}
							onChange={e => this.setState({ lastname: e.target.value })}
							margin="normal"
						/>
						<TextField
							required
							label="Score"
							value={score}
							onChange={e => this.setState({ score: e.target.value })}
							margin="normal"
						/>
					</form>
				)}
			</Mutation>
		)
	}
}
