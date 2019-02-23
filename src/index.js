import React from "react";
import { render } from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import PizzaShop from "./PizzaShop";

const App = () => (
  <MuiThemeProvider>
    <PizzaShop />
  </MuiThemeProvider>
);

render(<App />, document.getElementById("root"));
