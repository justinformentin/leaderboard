import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloProviderHooks } from "react-apollo-hooks";
import CreatePlayer from './containers/CreatePlayer'
import ShowPlayers from './containers/ShowPlayers'

const client = new ApolloClient({
	uri: 'http://localhost:4000'
})

const App = () => {
	return (
		<ApolloProvider client={client}>
			<ApolloProviderHooks client={client}>
				<CreatePlayer />
				<ShowPlayers />
			</ApolloProviderHooks>
		</ApolloProvider>
	)
}

export default App
