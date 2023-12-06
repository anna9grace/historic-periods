import { theme } from "../config/theme";

export const isMobile = () => {
  return window.innerWidth < theme.breakpoints.md;
};
export const isTablet = () => {
  return (
    window.innerWidth < theme.breakpoints.lg &&
    window.innerWidth > theme.breakpoints.md + 1
  );
};
