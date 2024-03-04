// external imports
import { AppBar } from "@mui/material";

// internal imports
import MsgMicrophone from "../msg-microphone/MsgMicrophone";
import MsgInputArea from "../msg-input-area/MsgInputArea";

const MsgInputBox = ({ drawerWidth }) => {
  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          top: "auto",
          bottom: 0,
          display: "flex",
          flexDirection: "row",
          paddingBlock: "10px",
          paddingInline: "4px",
          gap: "8px",
          backgroundColor: (theme) => theme.palette.accent.main,
        }}
      >
        <MsgInputArea />
        <MsgMicrophone />
      </AppBar>
    </>
  );
};

export default MsgInputBox;
