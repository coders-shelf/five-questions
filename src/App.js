import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./components/layout/Header";
import Content from "./components/layout/Content";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#3FC1C9"
    },
    secondary: {
      main: "#fc5185"
    },
    background: {
      paper: "#364F6B",
      default: "#364F6B"
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Header />
        <Content />
      </Router>
    </ThemeProvider>
  );
}

export default App;
