import React, { FC, useRef, useState, useEffect } from "react";
import { styled } from "styled-components";

import { IHistoricalPeriod, IHistoricalData } from "../../services/data.types";

import { CircleButton } from "../CircleButton/CircleButton";
import gsap from "gsap";
import { TweenMax } from "gsap";
import { getCircleRotation } from "../../helpers/getCircleRotation.helper";

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
  border: 1px solid rgba(${(props) => props.theme.palette.transparent}, 0.2);
`;

export const CircleSwitch: FC<ICircleSwitchProps> = ({
  periods,
  onClick,
  currentPeriod,
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

  const updateRadius = () => {
    if (!wrapperRef.current?.offsetHeight) return;
    setCurrentRadius(wrapperRef.current?.offsetHeight / 2);
  };

  const handleOnButtonClick = (id: number) => {
    onClick(id);
    updateAnimation(id);
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
