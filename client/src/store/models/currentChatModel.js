// external imports
import { action, thunk } from "easy-peasy";
import axios from "axios";
import Cookies from "js-cookie";

// make model
const model = {
  currChat: {
    conversationId: "",
    conversationName: "",
    conversationAvatar: "",
    creatorId: "",
    participantId: "",
    isGroup: false,
    groupName: "",
    groupMembers: [],
    messages: [],
    isConversationStart: false,
  },

  /* thunk */

  //(this function requests to backend for create a new conversation)
  getChatById: thunk(async (actions, payload, helpers) => {
    const chat = await axios.get(
      `http://localhost:8080/api/v1/chats/${payload}`,
      {
        headers: {
          Authorization: Cookies.get("chat-app-token"),
        },
      }
    );
    actions.updateCurChat(chat.data.conversation);
  }),

  /* action */

  //(this function updates local state of it)
  updateCurChat: action((state, payload) => {
    const user = JSON.parse(localStorage.getItem("localUser"));

    if (!payload.isGroup) {
      const creatorName = payload.creator.username;
      const participantName = payload.participant.username;
      if (payload.conversationName === user.name) {
        if (payload.conversationName !== creatorName) {
          payload.conversationName = creatorName;
        } else {
          payload.conversationName = participantName;
        }
      }
    }

    const newObj = {
      conversationId: payload._id,
      conversationName: payload.conversationName,
      conversationAvatar: "", //TODO: set avatar in logically
      creatorId: payload.creator.userId,
      participantId: payload.participant?.userId,
      isGroup: payload.isGroup,
      groupName: payload.groupName,
      groupMembers: Array.isArray(payload.groupMembers)
        ? [...payload.groupMembers]
        : [],
      messages: Array.isArray(payload.messages) ? [...payload.messages] : [],
      isConversationStart: true,
    };
    state.currChat = newObj;
  }),

  // this function push message or update in local state
  updateMessage: action((state, payload) => {
    state.currChat.messages.push(payload.message);
  }),

  // this function prepared new message object to send for server
  prepareMsgObj: action((state, payload) => {
    const curChatObj = state.currChat;
    const loggedUser = JSON.parse(localStorage.getItem("localUser"));

    const msgData = {
      conversationId: curChatObj.conversationId,
      text: payload,
      attachment: "",
      sender: {
        userId: loggedUser.userId,
        username: loggedUser.name,
        avatar: loggedUser.avatar || "",
      },
      receiverId: curChatObj.participantId,
    };

    return msgData;
  }),
};

// exports
export default model;
