import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import styled from 'styled-components'
import { UPDATE_PLAYER, PLAYERS_QUERY } from '../gql';
import Modal from '../components/Modal';
import { Form, Button } from '../components/Form.styles';

const CloseButton = styled.button`
	border: none;
	background: none;
	font-weight: 700;
  padding: 0.5em 1.5rem;
  cursor: pointer;
`;

const Title = styled.h3`
	text-align: center;
`;

const EditPlayer = props => {

	const [firstname,	setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [score, setScore] = useState('');
	const [modalOpen, setModalOpen] = useState(false);

	const onSubmit = e => {
		e.preventDefault();
		let { id } = props.player
		updatePlayer({
			variables: {
				id,
				firstname: firstname || props.player.firstname,
				lastname: lastname || props.player.lastname,
				score: score || props.player.score
			}
		})
		setModalOpen(false)
	};

	const updatePlayer = useMutation(UPDATE_PLAYER, {
		update: (cache, { data: { updatePlayer } }) => {
			let { players } = cache.readQuery({ query: PLAYERS_QUERY })
			cache.writeQuery({
				query: PLAYERS_QUERY,
				data: {
					players: players.map(player => (player.id === updatePlayer.id ? updatePlayer : player))
				}
			})
		}
	});

	const onModalOpen = () => setModalOpen(true);

	const onModalClose = () => setModalOpen(false);

  const onKeyDown = (event) => {
    if (event.keyCode === 27) {
      onModalClose()
    }
  };

	return (
		<>
			<CloseButton onClick={onModalOpen}>Edit</CloseButton>
			{modalOpen &&
				<Modal
					onModalClose={onModalClose}
					onKeyDown={onKeyDown}
					onClickOutside={onModalClose}
				>
					<Title>Edit Player</Title>
					<Form onSubmit={onSubmit}>
							<input
								aria-label="Edit First Name"
								placeholder={props.player.firstname}
								onChange={e => setFirstname(e.target.value)}
							/>
							<input
								aria-label="Edit Last Name"
								placeholder={props.player.lastname}
								onChange={e => setLastname(e.target.value)}
							/>
							<input
								aria-label="Edit Score"
								placeholder={props.player.score}
								onChange={e => setScore(e.target.value)}
							/>
						<Button type="submit">
							Edit Player
						</Button>
					</Form>
				</Modal>
			}
		</>
	)
}

export default EditPlayer;
