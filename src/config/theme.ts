import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  palette: {
    primary: "#3877EE",
    secondary: "#5D5FEF",
    tertiary: "#EF5DA8",
    main: "#42567A",
    background: "#F4F5F9",
    border: "#C7CDD9",
    white: "#FFFFFF",
    transparent: "66, 86, 122",
  },
  fontFamily: {
    primary: "'PT Sans', sans-serif",
    secondary: "'Bebas Neue', sans-serif",
  },
  typography: {
    h1: {
      fontSize: "200px",
      lineHeight: "120%",
    },
    h2: {
      fontSize: "56px",
      lineHeight: "120%",
    },
    h3: {
      fontSize: "25px",
      lineHeight: "120%",
    },
    body1: {
      fontSize: "20px",
      lineHeight: "120%",
    },
    body2: {
      fontSize: "16px",
      lineHeight: "120%",
    },
    body3: {
      fontSize: "14px",
      lineHeight: "120%",
    },
  },
  breakpoints: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1400,
  },
};
