import React from 'react';
import styled from 'styled-components';
import TableData from '../components/TableData';

const Container = styled.div`
	margin: 0 auto;
	width: 50%;
	@media only screen and (max-width: 1080px) {
		width: 65%;
	}
	@media only screen and (max-width: 768px) {
		width: 75%;
	}
	@media only screen and (max-width: 600px) {
		width: 95%;
	}
`;

const ShowPlayer = ({data}) => {

	return (
		<Container>
			{!data.players ? (
				<p style={{ color: 'red' }}>No Players!</p>
			) : (
				<table>
					<thead>
						<tr>
							<th>Icon</th>
							<th>Name</th>
							<th>Score</th>
							<th />
							<th />
						</tr>
					</thead>
					<tbody>
						{data.players.map(player => (
							<TableData
								key={player.id}
								player={player} />
						))}
					</tbody>
				</table>
			)}
		</Container>
	)
}

export default ShowPlayer;
