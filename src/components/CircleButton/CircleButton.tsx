import React, { FC, useRef, useState, useEffect, useContext } from "react";
import { styled, ThemeContext } from "styled-components";
import { gsap } from "gsap";
import { IHistoricalPeriod } from "../../services/data.types";
import { getCircleRotation } from "../../helpers/getCircleRotation.helper";
import { Typography } from "../ui/Typography/Typography";
import { Button } from "../ui/Button/Button";
import { getInitialPosition } from "./CircleButton.helper";

export interface ICircleButtonProps {
  radius: number;
  activeId: number;
  period: IHistoricalPeriod;
  total: number;
  onClick: (periodId: number) => void;
}

const ButtonWrapper = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 56px;
  height: 56px;
  margin: auto;
`;

const SwitchButton = styled(Button)`
  position: relative;
  background: ${({ theme }) => theme.palette.main};
  transform: scale(0.11);

  ${ButtonWrapper}.--active & {
    transform: none;
    background: ${({ theme }) => theme.palette.background};
  }
`;

const ButtonLabel = styled(Typography)`
  position: absolute;
  left: 100%;
  margin-left: 20px;
`;

export const CircleButton: FC<ICircleButtonProps> = ({
  radius,
  activeId,
  period,
  total,
  onClick,
}) => {
  const themeContext = useContext(ThemeContext);
  const currentRef = useRef<HTMLSpanElement | null>(null);

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    gsap.to(currentRef.current, {
      transform: getInitialPosition(period.id - 2, total, radius),
      rotate: getCircleRotation(activeId - 1, total),
      duration: 0,
    });
  }, [radius, total]);

  useEffect(() => {
    const active = activeId === period.id;
    setIsActive(active);
    updateAnimation();
  }, [activeId, period]);

  const handleOnButtonHover = () => {
    const target = currentRef.current?.children[0];

    target &&
      gsap.to(target, {
        backgroundColor: (themeContext?.palette.background as any) ?? "none",
        scale: 1,
      });
  };

  const handleOnButtonLeave = () => {
    const target = currentRef.current?.children[0];

    activeId !== period.id &&
      target &&
      gsap.to(target, {
        backgroundColor: (themeContext?.palette.main as any) ?? "none",
        scale: 0.11,
      });
  };

  const updateAnimation = () => {
    gsap.to(currentRef.current, {
      rotate: getCircleRotation(activeId - 1, total),
    });
    activeId === period.id ? handleOnButtonHover() : handleOnButtonLeave();
  };

  return (
    <ButtonWrapper
      key={period.id}
      ref={currentRef}
      className={isActive ? "--active" : ""}
      onMouseEnter={!isActive ? handleOnButtonHover : undefined}
      onMouseLeave={!isActive ? handleOnButtonLeave : undefined}
    >
      <SwitchButton size="large" onClick={() => onClick(period.id)}>
        <Typography>{period.id}</Typography>
        {isActive && (
          <ButtonLabel variant="body1" component="span" bold>
            {period.sphere}
          </ButtonLabel>
        )}
      </SwitchButton>
    </ButtonWrapper>
  );
};
