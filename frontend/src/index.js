import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Route } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route path="/main" component={App} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
