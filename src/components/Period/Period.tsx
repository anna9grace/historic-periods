import React, { FC, useEffect, useState } from "react";
import { styled } from "styled-components";
import { Typography } from "../ui/Typography/Typography";
import { CircleSwitch } from "../CircleSwitch/CIrcleSwitch";
import { IHistoricalData, IHistoricalPeriod } from "../../services/data.types";
import { UPDATE_INTERVAL, getNewYear, getPeriodsGap } from "./Period.helpers";

export interface IPeriodProps {
  periods: IHistoricalData;
  currentPeriod: IHistoricalPeriod;
  onClick: (periodId: number) => void;
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin: 8vh 0 10vh;
  &::before,
  &::after {
    content: "";
    position: absolute;
    background: rgba(${(props) => props.theme.palette.transparent}, 0.1);
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    margin: auto;
  }
  &::before {
    width: 100%;
    height: 1px;
  }
  &::after {
    width: 1px;
    height: 200vh;
  }
`;

const Year = styled(Typography).attrs<{ $startYear?: boolean }>((props) => ({
  component: "span",
  variant: "h1",
  bold: true,
}))`
  margin: 0 40px;
  padding-bottom: 20px;
  letter-spacing: -4px;
  line-height: 100%;
  color: ${(props) =>
    props.theme.palette[props.$startYear ? "secondary" : "tertiary"]};
`;

export const Period: FC<IPeriodProps> = ({
  periods,
  currentPeriod,
  onClick,
}) => {
  const [currentYears, setCurrentYears] = useState<number[] | null>(null);
  const [newYears, setNewYears] = useState<number[] | null>(null);
  let timerRef: NodeJS.Timer | null = null;

  useEffect(() => {
    const years = [currentPeriod.start, currentPeriod.end];

    if (!currentYears) {
      setCurrentYears(years);
    } else {
      setNewYears(years);
    }
  }, [currentPeriod]);

  useEffect(() => {
    if (!currentYears || !newYears) return;

    updateYears(newYears, currentYears);

    return () => {
      timerRef && clearInterval(timerRef);
    };
  }, [newYears]);

  const updateYears = (newYears: number[], oldYears: number[]) => {
    let years = oldYears;
    let step = 1;

    const periodsGap = getPeriodsGap(oldYears, newYears);

    timerRef = setInterval(() => {
      const updatedYears = [
        getNewYear(years[0], newYears[0]),
        getNewYear(years[1], newYears[1]),
      ];

      years = updatedYears;
      setCurrentYears(updatedYears);

      if (step === periodsGap && timerRef) clearInterval(timerRef);

      step++;
    }, UPDATE_INTERVAL);
  };

  return (
    <Wrapper>
      {currentYears && (
        <>
          <Year $startYear>{currentYears[0]}</Year>
          <Year>{currentYears[1]}</Year>

          <CircleSwitch
            periods={periods}
            currentPeriod={currentPeriod}
            onClick={onClick}
          ></CircleSwitch>
        </>
      )}
    </Wrapper>
  );
};
