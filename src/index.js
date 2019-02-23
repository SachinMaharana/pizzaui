import React from "react";
import { render } from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Card from "./Card";

const App = () => (
  <MuiThemeProvider>
    <Card />
  </MuiThemeProvider>
);

render(<App />, document.getElementById("root"));
