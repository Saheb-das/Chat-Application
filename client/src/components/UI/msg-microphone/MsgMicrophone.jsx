// external imports
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import { Box } from "@mui/material";

const MsgMicrophone = () => {
  return (
    <>
      <Box
        sx={{
          width: "40px",
          height: "40px",
          border: (theme) => `2px solid ${theme.palette.secondary.dark}`,
          borderRadius: "50%",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: (theme) => theme.palette.primary.main,
        }}
      >
        <KeyboardVoiceIcon sx={{ width: "30px", height: "30px" }} />
      </Box>
    </>
  );
};

export default MsgMicrophone;
