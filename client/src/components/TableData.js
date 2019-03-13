import React from 'react'
import styled from 'styled-components';
import EditPlayer from '../containers/EditPlayer'
import DeletePlayer from '../containers/DeletePlayer'

const Icon = styled.div`
  background: #269df3;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 1.2;
  border-radius: 100px;
  width: 2rem;
  height: 2rem;
  text-align: center;
  margin: 0.5rem auto;
  div {
    margin: auto;
  }
`;

const Table = props => {
  const {firstname, lastname, score, id} = props.player
  return (
    <tr key={id}>
      <td>
        <Icon>
          <div>{lastname[0].toUpperCase()}</div>
        </Icon>
      </td>
      <td>{lastname}, {firstname}</td>
      <td>{score}</td>
      <td>
        <EditPlayer player={props.player} />
      </td>
      <td>
        <DeletePlayer id={id} name={`${firstname} ${lastname}`} />
      </td>
    </tr>
  )
}

export default Table;
