import React, { FC, useEffect, useState } from "react";
import { styled, ThemeProvider } from "styled-components";

import { theme } from "../../config/theme";
import { IHistoricalPeriod } from "../../services/data.types";
import { historicalData } from "../../services/data.mock";
import { Typography } from "../ui/Typography/Typography";
import { Period } from "../Period/Period";
import { ControlButtons } from "../ControlButtons/ControlButtons";
import { EventsSlider } from "../EventsSlider/EventsSlider";

const Container = styled.div`
  display: flex;
  height: 100%;
  max-height: 100vh;
  width: 100%;
  flex-direction: column;
  padding-left: 16.7%;
  padding-right: 8.3%;
  overflow: hidden auto;
  background-color: ${({ theme }) => theme.palette.background};
  @media (max-width: ${({ theme }) => theme.breakpoints.xl}px) {
    padding-left: 5%;
    padding-right: 5%;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    padding: 0;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  border-left: 1px solid;
  border-right: 1px solid;
  border-color: rgba(${({ theme }) => theme.palette.transparent}, 0.1);
  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    width: 1px;
    height: 100%;
    margin: auto;
    background: rgba(${(props) => props.theme.palette.transparent}, 0.1);
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    justify-content: flex-start;
    padding: 13px 20px;
    border: none;
    &::before {
      content: none;
    }
  }
`;

const Header = styled.header`
  position: relative;
  margin-top: 20px;
  padding-left: 4.2vw;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 5px;
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.palette.primary} 0%,
      ${({ theme }) => theme.palette.tertiary} 100%
    );
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    max-width: 140px;
    margin-top: 8.3vh;
    padding-left: 0;
    &::before {
      content: none;
    }
  }
`;

const Title = styled(Typography).attrs({
  component: "h2",
  variant: "h2",
  bold: true,
})`
  max-width: 360px;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    ${theme.typography.body1}
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
          <ControlButtons
            currentPeriod={currentPeriodId}
            total={Object.values(historicalData).length}
            onClick={setCurrentPeriodId}
          />
          <EventsSlider events={period.events} />
        </Wrapper>
      </Container>
    </ThemeProvider>
  );
};
