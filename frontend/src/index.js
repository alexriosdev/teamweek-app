import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./reducers/store";
import { ThemeProvider } from "@material-ui/styles";
import { blueTheme, redTheme, pinkTheme } from "./theme";

ReactDOM.render(
  <ThemeProvider theme={pinkTheme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
