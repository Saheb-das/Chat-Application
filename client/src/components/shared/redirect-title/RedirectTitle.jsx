// external imports
import { Link, Typography, Box } from "@mui/material";
import { NavLink } from "react-router-dom";

const RedirectTitle = ({ info, link_text, url }) => {
  return (
    <>
      <Box sx={{ textAlign: "center", marginTop: "6px" }}>
        <Typography
          sx={{
            display: "inline-block",
            fontWeight: (theme) => theme.typography.fontWeightBold,
            textAlign: "center",
          }}
        >
          {info}
        </Typography>
        <Link
          component={NavLink}
          to={url}
          sx={{
            color: (theme) => theme.palette.accent.dark,
            fontWeight: (theme) => theme.typography.fontWeightBold,
            cursor: "pointer",
            marginLeft: "8px",
            textTransform: "capitalize",
          }}
        >
          {link_text}
        </Link>
      </Box>
    </>
  );
};

export default RedirectTitle;
