// external imports
import { useState } from "react";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import PhoneIcon from "@mui/icons-material/Phone";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

// internal imports
import LogoutModal from "../logout-modal/LogoutModal";

const IconGroup = () => {
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      <Box
        sx={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: (theme) => theme.palette.secondary.main,
        }}
      >
        <PhoneIcon sx={{ cursor: "pointer" }} />
        <VideoCallIcon
          sx={{ width: "30px", height: "30px", cursor: "pointer" }}
        />
        {open ? (
          <ClearIcon
            sx={{ width: "30px", height: "30px", cursor: "pointer" }}
            onClick={handleToggle}
          />
        ) : (
          <MoreVertIcon
            sx={{ width: "30px", height: "30px", cursor: "pointer" }}
            onClick={handleToggle}
          />
        )}

        {open && <LogoutModal />}
      </Box>
    </>
  );
};

export default IconGroup;
