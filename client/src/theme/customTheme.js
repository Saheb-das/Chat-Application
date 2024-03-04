import { createTheme } from "@mui/material";

const customTheme = (selectMode) => {
  return createTheme(
    selectMode === "light"
      ? {
          palette: {
            mode: selectMode,
            primary: {
              light: "",
              main: "#fff",
              dark: "",
            },
            secondary: {
              light: "#626262",
              main: "#212121",
              dark: "#181818",
            },

            accent: {
              light: "",
              main: "#FAFE4D",
              dark: "#B4A202",
            },
          },
          typography: {
            fontFamily: "Inria Sans",
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightBold: 700,
          },
        }
      : {
          palette: {
            mode: selectMode,
            primary,
          },
          typography: {
            fontFamily: "Inria Sans",
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightBold: 700,
          },
        }
  );
};

export default customTheme;
