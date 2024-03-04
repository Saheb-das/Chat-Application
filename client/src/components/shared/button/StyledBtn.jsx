import { Button } from "@mui/material";

const StyledBtn = ({ text, type }) => {
  return (
    <>
      <Button
        variant="contained"
        sx={{
          backgroundColor: (theme) => theme.palette.accent.main,
          color: (theme) => theme.palette.secondary.main,
          fontWeight: (theme) => theme.typography.fontWeightBold,
          display: "block",
          fontSize: "20px",
          border: "2px solid black",
          borderRadius: "10px",
          textTransform: "capitalize",
          paddingInline: "35px",
          paddingBlock: "0px",
          marginInline: "auto",
          marginTop: "30px",
        }}
        type={type}
      >
        {text}
      </Button>
    </>
  );
};

export default StyledBtn;
