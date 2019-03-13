import React from 'react';
import { useMutation } from 'react-apollo-hooks';
import styled from 'styled-components';
import { REMOVE_PLAYER, PLAYERS_QUERY } from '../gql';

const Button = styled.button`
	background: none;
	border: none;
  cursor: pointer;
  svg {
    width: 25px;
    height: 25px;
    fill: transparent;
    stroke: red;
    stroke-linecap: round;
    stroke-width: 2;
  }
`;

const DeletePlayer = props => {

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
		<Button
			aria-label="Delete"
			onClick={deletePlayer}
		>
			<svg viewBox="0 0 40 40">
				<path d="M 10,10 L 30,30 M 30,10 L 10,30" />
			</svg>
		</Button>
	)
}

export default DeletePlayer;
