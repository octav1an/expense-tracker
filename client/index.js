import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    background: {
      default: "#f8f8f8", // Light gray
    },
    personalSpace: {
      main: "#995ce8",
      light: "#b97eff",
      dark: "#7a46b5",
      // placeholder: "#dec2ff", // Input placeholder color
      placeholder: "#d7b4ff", // Input placeholder color
      background: "#fcfcfc", // Input background color
      backgroundHover: "#f1f1f1", // Input background color on hover
    },
    commonSpace: {
      main: "#3cc8c7",
      light: "#66e0df", // Lightened shade of teal
      dark: "#299d96", // Darkened shade of teal
      placeholder: "#94e2df", // Input placeholder color (lighter shade)
      background: "#fcfcfc", // Input background color
      backgroundHover: "#f1f1f1", // Input background color on hover
    },
    foodSpace: {
      main: "#e86ca9",
      light: "#f9a5d1", // Lightened shade of magenta
      dark: "#c96d86", // Darkened shade of magenta
      placeholder: "#f0abcb", // Input placeholder color (lighter shade)
      background: "#fcfcfc", // Input background color
      backgroundHover: "#f1f1f1", // Input background color on hover
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
