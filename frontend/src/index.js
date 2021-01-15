import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./reducers/store";
import { ThemeProvider } from "@material-ui/styles";
import { blueTheme, redTheme, pinkTheme } from "./theme";

// Manually Implementing the store
// import { createStore, combineReducers } from "redux";
// import userReducer from "./reducers/userReducer";
// const store = createStore(userReducer); /* code change */

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={pinkTheme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
