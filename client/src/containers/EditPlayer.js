import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import styled from 'styled-components'
import { UPDATE_PLAYER, PLAYERS_QUERY } from '../gql';
import Modal from '../components/Modal';

const Button = styled.button`
	border: none;
	background: none;
	font-weight: 700;
  padding: 0.5em 1.5rem;
  cursor: pointer;
`;

const Title = styled.h3`
	text-align: center;
`;

const Form = styled.form`
	padding: 2rem 2rem;
	input {
		width: 100%;
		margin-bottom: 1rem;
		height: 1.5rem;
		border: none;
		background: none;
		border-bottom: 2px solid #3c4046;
		transition: all ease 0.4s
		&:focus {
			outline: none;
			border-bottom: 2px solid #058cec;
			transition: all ease 0.4s;
}
`;

const EditButton = styled.button`
	margin-top: 1.5rem;
	border: none;
	background: #195d8e;
	border-radius: 5px;
	padding: 0.5rem;
	color: #fff;
	cursor: pointer;
	font-weight: 700;
	width: 100%;
	box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.3);
	transition: all ease 0.4s
	&:hover {
		transform: translateY(-2px);
		transition: all ease 0.4s;
	}
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
				firstname,
				lastname,
				score
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
			<Button onClick={onModalOpen}>Edit</Button>
			{modalOpen &&
				<Modal
					onModalClose={onModalClose}
					onKeyDown={onKeyDown}
					onClickOutside={onModalClose}
				>
					<Title>Edit Player</Title>
					<Form onSubmit={onSubmit}>
							<input
								required
								aria-label="Edit First Name"
								placeholder={props.player.firstname}
								onChange={e => setFirstname(e.target.value)}
							/>
							<input
								required
								aria-label="Edit Last Name"
								placeholder={props.player.lastname}
								onChange={e => setLastname(e.target.value)}
							/>
							<input
								required
								aria-label="Edit Score"
								placeholder={props.player.score}
								onChange={e => setScore(e.target.value)}
							/>
						<EditButton type="submit">
							Edit Player
						</EditButton>
					</Form>
				</Modal>
			}
		</>
	)
}

export default EditPlayer;
