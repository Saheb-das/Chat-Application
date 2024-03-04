import { Avatar } from "@mui/material";
import React from "react";

const AvatarImg = ({ img_url, alt_text }) => {
  return (
    <>
      <Avatar
        src={img_url}
        alt={alt_text}
        sx={{ width: "35px", height: "35px", marginRight: "10px" }}
      />
    </>
  );
};

export default AvatarImg;
