import { Typography } from "@mui/material";
import React from "react";

const HeadingTitle = ({ text }) => {
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          textTransform: "capitalize",
          fontWeight: (theme) => theme.typography.fontWeightBold,
          color: (theme) => theme.palette.secondary.dark,
          marginBottom: "30px",
        }}
      >
        {text}
      </Typography>
    </>
  );
};

export default HeadingTitle;
