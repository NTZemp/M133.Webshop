import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "./style.css";
import App from "./components/app/app";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
