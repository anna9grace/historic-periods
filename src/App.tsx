import React from "react";
import { createGlobalStyle, styled } from "styled-components";

import { HistoricalDates } from "./components/HistoricalDates/HistoricalDates";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'PT Sans', sans-serif;
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

const Layout = styled.div`
  position: relative;
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <HistoricalDates />
      </Layout>
    </>
  );
}

export default App;
