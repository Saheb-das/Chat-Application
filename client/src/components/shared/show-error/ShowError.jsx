// external imports
import { Typography } from "@mui/material";

const ShowError = ({ errMsg }) => {
  return (
    <Typography variant="body1" sx={{ marginTop: "-12px", color: "#db4d06" }}>
      {errMsg}
    </Typography>
  );
};

// exports
export default ShowError;
