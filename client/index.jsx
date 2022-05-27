import React from "react";
import ReactDom from "react-dom";

import "fomantic-ui-css/semantic.css";
import { Container, Header } from "semantic-ui-react";
import App from "./components/app";

ReactDom.render(App(), document.querySelector("#app"));
