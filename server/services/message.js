// internal imports
const Message = require("../models/Message");

/**
 *
 * @description - This function create new message object
 * @param {String} text - It is message which is typed
 * @param {File} attachment - It is an attachment which may be file, image etc.
 * @param {Object} sender - Object with name, id and avatar
 * @param {Object} receiver - Object with name, id and avatar
 * @param {String} conId - It is conversation Id. and created message is under this id
 * @returns {Object} - It return a new message object
 */
const createMessage = async (
  text,
  attachment,
  sender,
  receiver = "",
  conId
) => {
  const payload = {
    text,
    attachment,
    sender: {
      userId: sender.userId,
      username: sender.username,
      avatar: sender.avatar,
    },
    receiver: {
      userId: receiver.userId,
      username: receiver.username,
      avatar: receiver.avatar || "",
    },
    conversationId: conId,
  };

  const newMsg = new Message(payload);

  await newMsg.save();
  return newMsg;
};

// exports
module.exports = {
  createMessage,
};
