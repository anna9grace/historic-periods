import React, { FC } from "react";
import styled from "styled-components";
import {
  ThemeFontVariants,
  ThemeTypographyVariants,
} from "../../../config/theme.types";
import { Tag, TextTransform } from "./Typography.types";

interface ITypographyProps {
  children: string | number;
  className?: string;
  variant?: ThemeTypographyVariants;
  component?: Tag;
  fontType?: ThemeFontVariants;
  transform?: TextTransform;
  bold?: boolean;
}

const StyledTypography = styled.p<{
  $variant: ThemeTypographyVariants;
  $font: ThemeFontVariants;
  $transform?: TextTransform;
  $bold?: boolean;
  $color?: string;
}>`
  margin-top: 0;
  margin-bottom: 0;
  font-family: ${(props) => props.theme.fontFamily[props.$font]};
  text-transform: ${(props) => props.$transform ?? "none"};
  font-weight: ${(props) => (props.$bold ? 700 : 400)};
  ${(props) => props.theme.typography[props.$variant]};
  color: ${(props) => props.theme.palette.main};
`;

export const Typography: FC<ITypographyProps> = ({
  children,
  className,
  variant = "body1",
  component = "p",
  fontType = "primary",
  transform,
  bold,
}) => {
  return (
    <StyledTypography
      as={component}
      className={className}
      $variant={variant}
      $font={fontType}
      $transform={transform}
      $bold={bold}
    >
      {children}
    </StyledTypography>
  );
};
