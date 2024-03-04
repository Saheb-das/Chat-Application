import { styled } from "@mui/material";

const MsgInput = styled("input")(({ theme }) => ({
  border: "none",
  color: theme.palette.secondary.main,
  fontSize: "16px",
  marginLeft: "4px",
  flexGrow: "1",
}));

export default MsgInput;
