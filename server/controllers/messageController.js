// internal imports
const messageService = require("../services/message");
const conversationService = require("../services/conversation");
const userService = require("../services/user");
const customError = require("../utils/customError");

const createNewMessage = async (data) => {
  const { text, attachment, sender, receiverId, conversationId, isGroup } =
    data;
  console.log("data", data);

  const conId = await conversationService.getConversationByProperty(
    "_id",
    conversationId
  );
  if (!conId) customError("Conversation not found", 400);

  let receiver;
  if (isGroup === "private") {
    const user = await userService.getUserByProperty("_id", receiverId);
    if (!user) customError("User not found", 400);

    receiver = {
      userId: user._id,
      username: user.username,
      avatar: user.avatar,
    };
  }

  const newMsg = await messageService.createMessage(
    text,
    attachment,
    sender,
    receiver,
    conversationId,
    isGroup
  );

  const updatedChat = await conversationService.updateMsgInCon(
    conversationId,
    newMsg._id
  );

  return { message: newMsg };
};

// exports
module.exports = { createNewMessage };
