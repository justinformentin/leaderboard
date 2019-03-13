import React from 'react';
import { useMutation } from 'react-apollo-hooks';
import styled from 'styled-components';
import { CREATE_PLAYER, PLAYERS_QUERY } from '../gql';
import { useInput } from '../hooks/useInput';
import Layout from '../components/Layout';

const Title = styled.h1`
	text-align: center;
	color: #fff;
	margin-top: 1rem;
`;

const Container = styled.div`
	margin: 2rem auto;
	width: 30%;
	background: #dee2e5;
	display: flex;
	justify-content: center;
	border-radius: 10px;
	@media only screen and (max-width: 1080px) {
		width: 50%;
	}
	@media only screen and (max-width: 768px) {
		width: 65%;
	}
	@media only screen and (max-width: 600px) {
		width: 95%;
	}
`;

const Form = styled.form`
	padding: 2rem 3rem;
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

const Button = styled.button`
	margin-top: 0.5rem;
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

const CreatePlayer = () => {

	const { value:firstname, bind:bindFirstname, reset:resetFirstname } = useInput('');
  const { value:lastname, bind:bindLastname, reset:resetLastname } = useInput('');
	const { value:score, bind:bindScore, reset:resetScore } = useInput('');

	const onSubmit = e => {
		e.preventDefault();
		createPlayer({
			variables: {
				firstname,
				lastname,
				score
			}
		})
		resetFirstname();
		resetLastname();
		resetScore();
	}

  const createPlayer = useMutation(CREATE_PLAYER, {
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
		<Layout>
			<Title>Leaderboard</Title>
			<Container>
				<Form onSubmit={onSubmit}>
						<input
							aria-label="First Name"
							placeholder="First name"
							type="text" {...bindFirstname} />
						<input
							aria-label="Last Name"
							placeholder="Last name"
							type="text" {...bindLastname} />
						<input
							aria-label="Score"
							placeholder="Score"
							type="text" {...bindScore} />
					<Button type="submit">
						Add Player
					</Button>
				</Form>
			</Container>
		</Layout>
	)
}

export default CreatePlayer;
