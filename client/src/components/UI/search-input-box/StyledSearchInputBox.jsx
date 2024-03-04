import { styled } from "@mui/system";

const StyledSearchInputBox = styled("input")(({ theme }) => ({
  border: "2px solid #000",
  backgroundColor: theme.palette.accent.main,
  width: "180px",
  borderRadius: "10px",
  paddingBlock: "6px",
  paddingInline: "8px",
  fontSize: "18px",
  "&::placeholder": {
    color: "#000",
    textAlign: "center",
    textTransform: "capitalize",
    opacity: ".8",
  },
}));

export default StyledSearchInputBox;
