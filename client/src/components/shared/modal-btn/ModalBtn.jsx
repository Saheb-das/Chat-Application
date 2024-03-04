import { styled } from "@mui/material";

const ModalBtn = styled("button")(({ theme }) => ({
  border: "none",
  fontSize: "14px",
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.secondary.main,
  textTransform: "uppercase",
  backgroundColor: theme.palette.primary.main,
  cursor: "pointer",
}));

export default ModalBtn;
