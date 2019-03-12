import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloProviderHooks } from "react-apollo-hooks";
import CreatePlayer from './components/CreatePlayer'
import ShowPlayers from './components/ShowPlayers'

const client = new ApolloClient({
	uri: 'http://localhost:4000'
})

function App() {
	return (
		<ApolloProvider client={client}>
			<ApolloProviderHooks client={client}>
				<h1>Players list</h1>
				<CreatePlayer />
				<ShowPlayers />
			</ApolloProviderHooks>
		</ApolloProvider>
	)
}

export default App
