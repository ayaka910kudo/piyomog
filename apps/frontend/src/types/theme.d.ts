import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    colors: {
      accent: string;
      base: string;
      text: string;
    };
  }

  interface ThemeOptions {
    colors?: {
      accent?: string;
      base?: string;
      text?: string;
    };
  }
}
