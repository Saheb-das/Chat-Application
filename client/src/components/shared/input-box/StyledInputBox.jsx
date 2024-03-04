import { styled } from "@mui/system";

export const LableStyled = styled("label")(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.secondary.light,
  fontSize: "20px",
  display: "block",
  textTransform: "capitalize",
}));

export const InputStyled = styled("input")(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.accent.main,
  border: `2px solid ${theme.palette.secondary.main}`,
  borderRadius: "10px",
  fontSize: "18px",
  display: "block",
  paddingBlock: "7px",
  paddingInline: "10px",
  marginBottom: "10px",
}));
