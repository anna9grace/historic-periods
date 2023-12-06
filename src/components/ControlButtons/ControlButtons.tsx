import React, { FC } from "react";
import { styled } from "styled-components";

import { Button } from "../ui/Button/Button";
import { Typography } from "../ui/Typography/Typography";

export interface IControlButtonsProps {
  currentPeriod: number;
  total: number;
  onClick: (periodId: number) => void;
}

const Wrapper = styled.div`
  align-self: flex-start;
  padding-left: 4.2vw;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    position: fixed;
    bottom: calc(13px + env(safe-area-inset-bottom, 0));
    left: 20px;
    padding-left: 0;
    z-index: 2;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    gap: 8px;
    margin-top: 10px;
  }
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
          disabled={currentPeriod === 1}
          control="prev"
          onClick={handleOnPrevClick}
        />
        <Button
          disabled={currentPeriod === total}
          control="next"
          onClick={handleOnNextClick}
        />
      </ButtonWrapper>
    </Wrapper>
  );
};
