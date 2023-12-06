import "styled-components";
import {
  ThemeTypographyVariants,
  ThemeFontVariants,
  ThemeBreakpoints,
  ThemeColors,
  ThemeColorVariants,
} from "./theme.types";

declare module "styled-components" {
  export interface DefaultTheme {
    palette: Record<ThemeColors, Record<ThemeColorVariants, string> | string>;
    fontFamily: Record<ThemeFontVariants, string>;
    typography: Record<
      ThemeTypographyVariants,
      Record<string, string | number>
    >;
    breakpoints: Record<ThemeBreakpoints, number>;
  }
}
