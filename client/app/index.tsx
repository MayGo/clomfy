import "react-hot-loader/patch"
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import Root from "./Root";

const rootEl = document.getElementById("root");
ReactDOM.render(
  <AppContainer>
    <Root />
  </AppContainer>,
  rootEl
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./Root", () => {
    const NextRoot = require("./Root").default;
    ReactDOM.render(
      <AppContainer>
        <NextRoot />
      </AppContainer>
      ,
      rootEl
    );
  });
}