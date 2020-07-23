import React from "react";
import ReactDOM from "react-dom";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/fonts/honeywell-font.scss";
import "./assets/stylesheets/base.scss";

import App from "./app";

ReactDOM.render(<App />, document.getElementById("root"));
