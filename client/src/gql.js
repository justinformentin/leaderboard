import gql from 'graphql-tag'

const PLAYERS_QUERY = gql`
	{
		players {
			id
			firstname
			lastname
			score
			createdAt
			lastModified
		}
	}
`
const CREATE_PLAYER = gql`
	mutation CreatePlayer($firstname: String!, $lastname: String!, $score: Int!) {
		createPlayer(firstname: $firstname, lastname: $lastname, score: $score) {
			id
			firstname
			lastname
			score
			createdAt
			lastModified
		}
	}
`
const UPDATE_PLAYER = gql`
	mutation UpdatePlayer($id: ID!, $firstname: String!, $lastname: String!, $score: Int!) {
		updatePlayer(id: $id, firstname: $firstname, lastname: $lastname, score: $score) {
			id
			firstname
			lastname
			score
			createdAt
			lastModified
		}
	}
`
const REMOVE_PLAYER = gql`
	mutation RemovePlayer($id: ID!) {
		removePlayer(id: $id)
	}
`

export { PLAYERS_QUERY, CREATE_PLAYER, UPDATE_PLAYER, REMOVE_PLAYER }
