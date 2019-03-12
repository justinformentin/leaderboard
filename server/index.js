const { GraphQLServer } = require('graphql-yoga')
const mongoose = require('mongoose')

mongoose.connect(
	'mongodb://localhost:27017/leaderboard-scores',
	{
		useNewUrlParser: true
	}
)

const Player = mongoose.model('players', {
	firstname: String,
	lastname: String,
	score: {
		type: Number,
		min: [0, 'The minimum score is 0'],
		max: [100, 'The maximum score is 100']
	},
	createdAt: String,
	lastModified: String
})

const typeDefs = `
  type Player {
    id: ID!
    firstname: String!
    lastname: String!
		score: Int!
    createdAt: String!
    lastModified: String!
  }

  type Query {
    players(n:Int): [Player]
    player(firstname: String!): Player
  }

  type Mutation {
    createPlayer(
			firstname: String!,
			lastname: String!,
			score: Int!
		): Player

		updatePlayer(
			id: ID!,
			firstname: String!,
			lastname: String!,
			score: Int!
		): Player

    removePlayer(id: ID!): ID!
  }
`

const resolvers = {
	Query: {
		players: async (_, { n }) => {
			if (!n) n = 100
			const players = await Player.find({}).limit(n)
			if (players.length) return players
		},
		player: async (_, { firstname }) => {
			const player = await Player.findOne({ firstname })
			if (player) return player
		}
	},
	Mutation: {
		createPlayer: async (_, { firstname, lastname, score }) => {
			let date = new Date().toJSON()
			const player = new Player({
				firstname,
				lastname,
				score,
				createdAt: date,
				lastModified: date
			})
			await player.save()
			return player
		},
		updatePlayer: async (_, { id, firstname, lastname, score }) => {
			let _id = await Player.findByIdAndUpdate(id, {
				firstname,
				lastname,
				score,
				lastModified: new Date().toJSON()
			})
			return await Player.findOne({ _id })
		},
		removePlayer: async (_, { id }) => {
			let _id = await Player.findByIdAndRemove(id)
			return id
		}
	}
}

const server = new GraphQLServer({ typeDefs, resolvers })

mongoose.connection.once('open', () => {
	server.start(() => console.log('Server is running on localhost:4000'))
})
