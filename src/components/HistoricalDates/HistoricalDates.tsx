import React, { FC, useEffect, useState } from "react";
import { theme } from "../../config/theme";
import { styled, ThemeProvider } from "styled-components";
import { Typography } from "../ui/Typography/Typography";
import { Period } from "../Period/Period";
import { IHistoricalPeriod } from "../../services/data.types";
import { historicalData } from "../../services/data.mock";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100vh;
  width: 100%;
  padding-left: 16.7%;
  padding-right: 8.3%;
  background-color: ${(props) => props.theme.palette.background};
`;

const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  border-left: 1px solid;
  border-right: 1px solid;
  border-color: rgba(${(props) => props.theme.palette.transparent}, 0.1);
`;

const Title = styled(Typography).attrs({
  component: "h2",
  variant: "h2",
  bold: true,
})`
  max-width: 360px;
`;

const Header = styled.header`
  position: relative;
  padding-left: 4.2vw;
  &::before {
    content: "";
    position: absolute;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    width: 5px;
    background: linear-gradient(
      to bottom,
      ${(props) => props.theme.palette.primary} 0%,
      ${(props) => props.theme.palette.tertiary} 100%
    );
  }
`;

export const HistoricalDates: FC = () => {
  const [currentPeriodId, setCurrentPeriodId] = useState<number>(1);
  const [period, setPeriod] = useState<IHistoricalPeriod>(historicalData[1]);
  useEffect(() => {
    const data = historicalData[currentPeriodId];
    setPeriod(data);
  }, [currentPeriodId]);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Wrapper>
          <Header>
            <Title component="h2" variant="h2" bold>
              Исторические даты
            </Title>
          </Header>
          <Period
            periods={historicalData}
            currentPeriod={period}
            onClick={setCurrentPeriodId}
          />
        </Wrapper>
      </Container>
    </ThemeProvider>
  );
};
