import React, { Component } from 'react'
import { useQuery } from 'react-apollo-hooks'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import CircularProgress from '@material-ui/core/CircularProgress'

import EditPlayer from './EditPlayer'
import DeletePlayer from './DeletePlayer'

import { PLAYERS_QUERY } from '../gql'

export default function ShowPlayer() {

	const { data, loading, error } = useQuery(PLAYERS_QUERY);

		return (
		<div>
					{error ? (
						<p>Error!</p>
					) : loading ? (
						<CircularProgress size={50} />
					) : (
						<List>
							{!data.players ? (
								<p style={{ color: 'red' }}>No Players!</p>
							) : (
								<>
									{data.players.map((player, i, arr) => (
										<div key={i}>
											<ListItem>
												<Avatar
													style={{ backgroundColor: '#269df3' }}
												>{`${player.firstname[0].toUpperCase()}${player.lastname[0].toUpperCase()}`}</Avatar>
												<ListItemText
													primary={`${player.firstname} ${player.lastname}`}
													secondary={player.score}
												/>
												<ListItemSecondaryAction>

													<EditPlayer player={player} />

													<DeletePlayer id={player.id} name={`${player.firstname} ${player.lastname}`} />
												</ListItemSecondaryAction>
											</ListItem>
											{i !== arr.length - 1 && <Divider />}
										</div>
									))}
								</>
							)}
						</List>
					)
				}
		</div>
		)
}
