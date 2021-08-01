import React from "react";
import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import Router from "./Routes/router";

let theme = createMuiTheme({
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
    fontFamily: "Proza Libre",
    // htmlFontSize: 10,
  },
});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
