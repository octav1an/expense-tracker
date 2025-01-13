import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    background: {
      // default: "#f0f0f0", // Light gray
    },
    personalSpace: {
      main: "#995ce8",
      light: "#b97eff",
      dark: "#7a46b5",
    },
  },
});

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
