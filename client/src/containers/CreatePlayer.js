import React from 'react';
import { useMutation } from 'react-apollo-hooks';
import styled from 'styled-components';
import { CREATE_PLAYER, PLAYERS_QUERY } from '../gql';
import { useInput } from '../hooks/useInput';
import Layout from '../components/Layout';
import { Container, Form, Button } from '../components/Form.styles';

const Title = styled.h1`
	text-align: center;
	color: #fff;
	margin-top: 1rem;
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
							required
							aria-label="First Name"
							placeholder="First name"
							type="text" {...bindFirstname} />
						<input
							required
							aria-label="Last Name"
							placeholder="Last name"
							type="text" {...bindLastname} />
						<input
							required
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
