// external imports
import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";

const Home = () => {
  return (
    <>
      <CssBaseline />

      <Outlet />
    </>
  );
};

export default Home;
