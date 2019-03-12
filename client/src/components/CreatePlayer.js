import React, { useState } from 'react'
import { useMutation } from 'react-apollo-hooks'
import { CREATE_PLAYER, PLAYERS_QUERY } from '../gql'

export default function CreatePlayer() {

  const [firstName, setFirstname] = useState('');
	const [lastName, setLastname] = useState('');
	const [score, setScore] = useState('');

  const createPlayer = useMutation(CREATE_PLAYER, {
		// variables: { firstName, lastName, score },
		update:(cache, { data: { createPlayer } }) => {
			let { players } = cache.readQuery({ query: PLAYERS_QUERY })
			if (!players) players = []
			cache.writeQuery({
				query: PLAYERS_QUERY,
				data: { players: players.concat([createPlayer]) }
			})
		}
	})

  return (
		<form
			onSubmit={e => {
				e.preventDefault();
				createPlayer({
					variables: {
						firstName,
						lastName,
						score
					}
				});
			}}
		>
			<div>
				<label>First Name</label>
				<input onChange={e => setFirstname(e.target.value)}/>
			</div>
			<div>
				<label>Last Name</label>
				<input onChange={e => setLastname(e.target.value)}/>
			</div>
			<div>
				<label>Score</label>
				<input onChange={e => setScore(e.target.value)}/>
			</div>
			<button type="submit">
				Add Post
			</button>
		</form>
	)
}
