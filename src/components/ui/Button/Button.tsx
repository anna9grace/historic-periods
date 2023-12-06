import React, { FC } from "react";
import styled, { css } from "styled-components";
import { ButtonVariants, SizeTypes } from "./Button.types";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  size?: SizeTypes;
  variant?: ButtonVariants;
  onClick: (value: any) => void;
}

const StyledButton = styled.button<{
  $size: SizeTypes;
  $type: ButtonVariants;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background: ${(props) => props.theme.palette.background};
  border: none;
  border-radius: 50%;
  cursor: pointer;

  ${(props) => {
    switch (props.$size) {
      case "large":
        return css`
          width: 56px;
          height: 56px;
        `;
      case "small":
        return css`
          width: 40px;
          height: 40px;
        `;
      default:
        return css`
          width: 50px;
          height: 50px;
        `;
    }
  }}
  ${(props) =>
    props.$type === "outlined"
      ? css`
          border: 1px solid rgba(${props.theme.palette.transparent}, 0.5);
        `
      : css`
          background: ${props.theme.palette.white};
          box-shadow: 0 0 15px rgba(56, 119, 238, 0.1);
        `}
`;

export const Button: FC<IButtonProps> = ({
  children,
  className,
  onClick,
  size = "medium",
  variant = "outlined",
  ...rest
}) => {
  return (
    <StyledButton
      className={className}
      $size={size}
      $type={variant}
      onClick={onClick}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};
