// external imports
import { useStoreState } from "easy-peasy";
import { Box, Toolbar } from "@mui/material";

//internal imports
import MessageBox from "../msg-box/MessageBox";
import ConversationImg from "../../../assets/images/conversation.png";

const ChatsArea = ({ drawerWidth }) => {
  const selfId = JSON.parse(localStorage.getItem("localUser"))?.userId;
  const curUser = useStoreState((state) => state.currentChat.currChat);
  const curMessages = useStoreState(
    (state) => state.currentChat.currChat.messages
  );

  const isConversationStart = curUser.isConversationStart;
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
          p: 3,
          backgroundColor: (theme) => theme.palette.accent.main,
          paddingInline: "4px",
        }}
      >
        <Toolbar />

        {isConversationStart ? (
          curMessages &&
          curMessages.map(({ text, sender, _id }) => (
            <MessageBox
              key={_id}
              msg={text}
              side={selfId === sender.userId ? "right" : "left"}
              participant={sender.username}
            />
          ))
        ) : (
          <>
            <h2 style={{ textAlign: "center" }}>
              Please start a new conversation
            </h2>
            <img
              style={{ display: "block", width: "50%", marginInline: "auto" }}
              src={ConversationImg}
              alt=""
            />
          </>
        )}

        <Toolbar />
      </Box>
    </>
  );
};

export default ChatsArea;
