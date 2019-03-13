import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { PLAYERS_QUERY } from '../gql';
import Layout from '../components/Layout';
import Table from './Table';

const ShowPlayer = () => {

	const { data, loading } = useQuery(PLAYERS_QUERY);

	return (
	<Layout>
		{loading ? (
			<p>Loading...</p>
		) : (
			<Table data={data} />
		)}
	</Layout>
	)
}

export default ShowPlayer;
