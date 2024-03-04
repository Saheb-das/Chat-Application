// external imports
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/material";

// internal imports
import MsgInput from "../msg-input/MsgInput";
import { useParams } from "react-router-dom";
import prepareMsgObj from "../../../utils/preparedMessge";
import { useStoreActions, useStoreState } from "easy-peasy";
import model from "../../../store/models/currentChatModel";

// socket internal work
let privateSocket, groupSocket;

const MsgInputArea = () => {
  const { mode } = useParams();

  const [msg, setMsg] = useState("");
  const [socket, setSocket] = useState(null);

  const curChat = useStoreState((state) => state.currentChat.currChat);
  const updateMsg = useStoreActions(
    (actions) => actions.currentChat.updateMessage
  );

  useEffect(() => {
    if (socket) {
      socket.disconnect();
    }

    if (mode === "private") {
      privateSocket = io(`http://localhost:8080/private`);
      setSocket(privateSocket);
    } else if (mode === "group") {
      groupSocket = io(`http://localhost:8080/group`);
      setSocket(groupSocket);
    }
  }, [mode]);

  useEffect(() => {
    if (mode === "private") {
      privateSocket.on("privateMsgRcv", (data) => {
        updateMsg(data);
      });
    } else if (mode === "group") {
      groupSocket.on("groupMsgRcv", (data) => updateMsg(data));
    }

    return () => {
      if (socket) {
        socket.off("privateMsgRcv");
        socket.off("groupMsgRcv");
      }
    };
  }, [socket]);

  const handleClick = () => {
    if (msg.trim()) {
      let msgObj = prepareMsgObj(curChat, msg, mode);

      if (mode === "private") {
        privateSocket.emit("privateMsg", msgObj);
      } else if (mode === "group") {
        groupSocket.emit("groupMsg", msgObj);
      }
    }
    setMsg("");
  };
  return (
    <>
      <Box
        sx={{
          height: "40px",
          border: (theme) => `2px solid ${theme.palette.secondary.dark}`,
          borderRadius: "20px",
          flexGrow: "1",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          paddingInline: "6px",
          backgroundColor: (theme) => theme.palette.primary.main,
        }}
      >
        <SentimentSatisfiedAltIcon
          sx={{ cursor: "pointer", width: "30px", height: "30px" }}
        />
        <MsgInput
          type="text"
          placeholder="|Message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <AttachFileIcon sx={{ cursor: "pointer" }} />
        <SendIcon sx={{ cursor: "pointer" }} onClick={handleClick} />
      </Box>
    </>
  );
};

export default MsgInputArea;
