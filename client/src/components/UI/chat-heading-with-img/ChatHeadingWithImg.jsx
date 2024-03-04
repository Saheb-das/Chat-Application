// external imports
import { useStoreState } from "easy-peasy";
import { Avatar, Box, Typography } from "@mui/material";

// component
const ChatHeadingWithImg = () => {
  const curData = useStoreState((state) => state.currentChat.currChat);

  return (
    <>
      <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <Avatar
          sx={{
            width: { xs: "25px", sm: "34px", md: "40px" },
            height: { xs: "25px", sm: "34px", md: "40px" },
          }}
          alt={curData?.conversationName}
          src={curData ? curData.avatar : "dummy"}
        />

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            color: (theme) => theme.palette.secondary.dark,
            fontSize: { xs: "18px", sm: "20px", md: "22px" },
            fontWeight: (theme) => theme.typography.fontWeightBold,
          }}
        >
          {curData?.conversationName}
        </Typography>
      </Box>
    </>
  );
};

export default ChatHeadingWithImg;
