import React, { FC, forwardRef } from "react";
import styled, { css } from "styled-components";
import { ButtonVariants, ControlTypes, SizeTypes } from "./Button.types";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  size?: SizeTypes;
  variant?: ButtonVariants;
  onClick: (value: any) => void;
  control?: ControlTypes;
}

const StyledButton = styled.button<{
  $size: SizeTypes;
  $type: ButtonVariants;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: ${(props) => props.theme.palette.background};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  flex-shrink: 0;
  color: ${(props) => props.theme.palette.main};
  &:disabled {
    opacity: 0.5;
    cursor: initial;
  }
  svg {
    flex-shrink: 0;
    max-width: 100%;
    max-height: 100%;
  }
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
  ${({ $type, theme }) =>
    $type === "outlined"
      ? css`
          border: 1px solid rgba(${theme.palette.transparent}, 0.5);
          transition: all 0.3s ease;
          &:hover:not(:disabled),
          &:focus {
            background-color: ${theme.palette.white};
            outline: none;
          }
        `
      : css`
          background: ${theme.palette.white};
          box-shadow: 0 0 15px rgba(56, 119, 238, 0.1);
        `}
`;

export const Button = forwardRef<any, IButtonProps>(
  (
    {
      children,
      className,
      onClick,
      size = "medium",
      variant = "outlined",
      control,
      ...rest
    },
    ref
  ) => {
    return (
      <StyledButton
        className={className}
        $size={size}
        $type={variant}
        ref={ref}
        onClick={(evt) => {
          evt.preventDefault();
          onClick(evt);
        }}
        {...rest}
      >
        {control && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
          >
            {control === "next" ? (
              <path
                d="M22.5001 18.75L28.7501 25L22.5001 31.25"
                stroke="currentColor"
                strokeWidth="2"
              />
            ) : (
              <path
                d="M27.4999 18.75L21.2499 25L27.4999 31.25"
                stroke="currentColor"
                strokeWidth="2"
              />
            )}
          </svg>
        )}

        {children}
      </StyledButton>
    );
  }
);
