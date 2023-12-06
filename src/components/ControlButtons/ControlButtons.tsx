import React, { FC, useEffect, useState } from "react";
import { styled } from "styled-components";

import { Button } from "../ui/Button/Button";

import { IHistoricalData, IHistoricalPeriod } from "../../services/data.types";
import { Typography } from "../ui/Typography/Typography";

export interface IControlButtonsProps {
  onClick: (periodId: number) => void;
  currentPeriod: number;
  total: number;
}

const Wrapper = styled.div`
  align-self: flex-start;
  padding-left: 4.2vw;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

export const ControlButtons: FC<IControlButtonsProps> = ({
  currentPeriod,
  total,
  onClick,
}) => {
  const handleOnNextClick = () => {
    onClick(currentPeriod + 1);
  };

  const handleOnPrevClick = () => {
    onClick(currentPeriod - 1);
  };

  return (
    <Wrapper>
      <Typography variant="body3">
        {`${currentPeriod}`.padStart(2, "0")}/{`${total}`.padStart(2, "0")}
      </Typography>
      <ButtonWrapper>
        <Button
          onClick={handleOnPrevClick}
          disabled={currentPeriod === 1}
          control="prev"
        />
        <Button
          onClick={handleOnNextClick}
          disabled={currentPeriod === total}
          control="next"
        />
      </ButtonWrapper>
    </Wrapper>
  );
};
