import React from 'react'
import { useMutation } from 'react-apollo-hooks'
import { REMOVE_PLAYER, PLAYERS_QUERY } from '../gql'

export default function DeletePlayer(props) {

	const deletePlayer = useMutation(REMOVE_PLAYER, {
		variables: { id: props.id },
		update: (cache, { data: { removePlayer } }) => {
			let { players } = cache.readQuery({ query: PLAYERS_QUERY })
			cache.writeQuery({
				query: PLAYERS_QUERY,
				data: { players: players.filter(player => player.id !== removePlayer) }
			})
		},
	})
	return (
		<button
			aria-label="Delete"
			onClick={deletePlayer}
		>
			Delete
		</button>
	)
}
