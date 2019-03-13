import React, { Fragment } from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  *{
    padding: 0;
    margin: 0;
  }

  body {
    margin: 0;
    padding: 0;
    background: #212938;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  }

  table{
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    border-radius: 10px;
    background: #dee2e5;
    color: #333;
    overflow: hidden;
  }

  thead {
    background: #666e7a;
    color: #fff;
  }

  th, td {
    text-align: center;
  }

  th {
    padding: 0.5rem 0;
  }

  tr {
    font-size:1.1rem;
    &:nth-child(even) {
      background-color: #d0d5db;
    }
  }
`;

const Layout = ({ children }) => {
  return (
    <Fragment>
      <GlobalStyle />
      {children}
    </Fragment>
  );
};

export default Layout;