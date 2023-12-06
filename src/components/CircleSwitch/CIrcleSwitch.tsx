import React, { FC, useRef, useState, useEffect } from "react";
import { styled } from "styled-components";
import gsap from "gsap";

import { IHistoricalPeriod, IHistoricalData } from "../../services/data.types";
import { getCircleRotation } from "../../helpers/getCircleRotation.helper";
import { CircleButton } from "../CircleButton/CircleButton";

export interface ICircleSwitchProps {
  periods: IHistoricalData;
  currentPeriod: IHistoricalPeriod;
  onClick: (periodId: number) => void;
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 49vh;
  width: 49vh;
  max-height: 600px;
  max-width: 600px;
  margin: auto;
  border-radius: 50%;
  border: 1px solid rgba(${({ theme }) => theme.palette.transparent}, 0.2);
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    height: 350px;
    width: 350px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    display: none;
  }
`;

export const CircleSwitch: FC<ICircleSwitchProps> = ({
  periods,
  currentPeriod,
  onClick,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [currentRadius, setCurrentRadius] = useState(0);

  useEffect(() => {
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, [wrapperRef]);

  useEffect(() => {
    updateAnimation(currentPeriod.id);
  }, [currentPeriod]);

  const handleOnButtonClick = (id: number) => {
    onClick(id);
    updateAnimation(id);
  };

  const updateRadius = () => {
    if (!wrapperRef.current?.offsetHeight) return;
    setCurrentRadius(wrapperRef.current?.offsetHeight / 2);
  };

  const updateAnimation = (id: number) => {
    gsap.to(wrapperRef.current, {
      rotate: `-${getCircleRotation(id - 1)}`,
    });
  };

  return (
    <Wrapper ref={wrapperRef}>
      {currentRadius &&
        Object.values(periods).map((period, _, arr) => (
          <CircleButton
            key={period.id}
            period={period}
            activeId={currentPeriod.id}
            radius={currentRadius}
            total={arr.length}
            onClick={handleOnButtonClick}
          />
        ))}
    </Wrapper>
  );
};
