// external imports
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

// internal imports
import "./App.css";
import customTheme from "./theme/customTheme";
import router from "./router/router.jsx";

function App() {
  const theme = customTheme("light");
  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
