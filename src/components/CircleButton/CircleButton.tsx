import React, { FC, useRef, useState, useEffect, useContext } from "react";
import { styled, ThemeContext } from "styled-components";
import { Typography } from "../ui/Typography/Typography";
import { IHistoricalPeriod } from "../../services/data.types";
import { Button } from "../ui/Button/Button";
import { gsap } from "gsap";
import { getCircleRotation } from "../helpers/getCircleRotation.helper";
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
  width: 56px;
  height: 56px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
`;

const SwitchButton = styled(Button)`
  transform: scale(0.11);
  background: ${(props) => props.theme.palette.main};
  position: relative;

  ${ButtonWrapper}.--active & {
    transform: none;
    background: ${(props) => props.theme.palette.background};
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
      rotate: getCircleRotation(activeId - 1),
      duration: 0,
    });
  }, [radius]);

  useEffect(() => {
    const active = activeId === period.id;
    setIsActive(active);

    !active && handleOnButtonLeave();

    gsap.to(currentRef.current, {
      rotate: getCircleRotation(activeId - 1),
    });
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

    target &&
      gsap.to(target, {
        backgroundColor: (themeContext?.palette.main as any) ?? "none",
        scale: 0.11,
      });
  };

  const handleOnClick = (evt: Event, id: number) => {
    evt.preventDefault();
    onClick(id);
  };

  return (
    <ButtonWrapper
      key={period.id}
      ref={currentRef}
      className={isActive ? "--active" : ""}
      onMouseEnter={!isActive ? handleOnButtonHover : undefined}
      onMouseLeave={!isActive ? handleOnButtonLeave : undefined}
    >
      <SwitchButton
        size="large"
        onClick={(evt) => handleOnClick(evt, period.id)}
      >
        <Typography>{period.id}</Typography>
        {isActive && (
          <ButtonLabel variant="body1" bold component="span">
            {period.sphere}
          </ButtonLabel>
        )}
      </SwitchButton>
    </ButtonWrapper>
  );
};
