import { createMuiTheme } from "@material-ui/core/styles";

// Red & Yellow
const redTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#f6685e",
      main: "#f44336",
      dark: "#aa2e25",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ffee33",
      main: "#ffea00",
      dark: "#b2a300",
      contrastText: "#000",
    },
    custom: {
      dark: "#212121",
    },
  },
});

// Blue & Yellow
const blueTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#35baf6",
      main: "#03a9f4",
      dark: "#0276aa",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ffee33",
      main: "#ffea00",
      dark: "#b2a300",
      contrastText: "#000",
    },
    custom: {
      dark: "#212121",
    },
  },
});

// Pink & Lime
const pinkTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#ed4b82",
      main: "#e91e63",
      dark: "#a31545",
      contrastText: "#fff",
    },
    secondary: {
      light: "#d1ff33",
      main: "#c6ff00",
      dark: "#8ab200",
      contrastText: "#000",
    },
    custom: {
      dark: "#212121",
    },
  },
});

export { redTheme, blueTheme, pinkTheme };
