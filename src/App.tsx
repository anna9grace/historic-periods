import React from "react";
import { HistoricalDates } from "./components/HistoricalDates/HistoricalDates";
import { createGlobalStyle, styled } from "styled-components";

const GlobalStyle = createGlobalStyle<{ $whiteColor?: boolean }>`
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
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
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
