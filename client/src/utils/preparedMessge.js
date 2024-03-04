/**
 * @description - This function receive a string and make a message object
 * @param {Object} curChatObj - It is current chat Object
 * @param {String} msg - It is message
 * @returns {Object} - It return a message object
 */
const prepareMsgObj = (curChatObj, msg, mode) => {
  const loggedUser = JSON.parse(localStorage.getItem("localUser"));

  const msgData = {
    conversationId: curChatObj.conversationId,
    text: msg,
    attachment: "",
    sender: {
      userId: loggedUser.userId,
      username: loggedUser.name,
      avatar: loggedUser.avatar || "",
    },
    receiverId: curChatObj?.participantId,
    isGroup: mode,
  };

  return msgData;
};

// exports
export default prepareMsgObj;
