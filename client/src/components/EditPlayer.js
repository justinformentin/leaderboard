import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'

import { UPDATE_PLAYER, PLAYERS_QUERY } from '../gql'

export default class EditPlayer extends Component {
	state = {
		editing: false,
		firstname: '',
		lastname: '',
		score: ''
	}
	componentWillMount() {
		let { firstname, lastname, score } = this.props.player
		this.setState({ firstname, lastname, score })
	}
	updatePlayer = updatePlayer => {
		let { firstname, lastname, score } = this.state
		let { id } = this.props.player
		if (!firstname || !lastname || !score) return
		console.log(firstname, lastname, score)
		updatePlayer({
			variables: {
				id,
				firstname,
				lastname,
				score
			}
		})
		this.setState({ editing: false })
	}
	handleOpen = () => {
		this.setState({ editing: true })
	}
	handleClose = () => {
		let { firstname, lastname, score } = this.props.player
		this.setState({ editing: false, firstname, lastname, score })
	}
	render() {
		let { firstname, lastname, score } = this.state
		return (
			<Mutation
				mutation={UPDATE_PLAYER}
				update={(cache, { data: { updatePlayer } }) => {
					let { players } = cache.readQuery({ query: PLAYERS_QUERY })
					cache.writeQuery({
						query: PLAYERS_QUERY,
						data: {
							players: players.map(player => (player.id === updatePlayer.id ? updatePlayer : player))
						}
					})
				}}
			>
				{updatePlayer => (
					<>
						<IconButton aria-label="edit" onClick={this.handleOpen}>
							<EditIcon />
						</IconButton>

						<Dialog
							open={this.state.editing}
							onClose={this.handleClose}
							aria-labelledby="form-dialog-title"
						>
							<DialogTitle id="form-dialog-title">Edit</DialogTitle>
							<DialogContent>
								<form noValidate autoComplete="off">
									<TextField
										required
										label="FirstName"
										value={firstname}
										onChange={e => this.setState({ firstname: e.target.value })}
										margin="normal"
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
							</DialogContent>
							<DialogActions>
								<Button onClick={this.handleClose} color="secondary">
									Cancel
								</Button>
								<Button
									onClick={() => {
										this.updatePlayer(updatePlayer)
									}}
									color="primary"
								>
									Save
								</Button>
							</DialogActions>
						</Dialog>
					</>
				)}
			</Mutation>
		)
	}
}
