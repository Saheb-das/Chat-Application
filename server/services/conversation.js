// internal imports
const Conversation = require("../models/Conversation");
const strGenaretor = require("../utils/stringGenaretor");

/**
 * @description - this function find conversation object and return it.
 * @param {String} key - it is a string parameter
 * @param {String} value - it is actual value
 * @returns {Promise} - return conversation object
 */
const getConversationByProperty = async (key, value) => {
  if (key === "_id")
    return await Conversation.findById(value).populate("messages");
  else return await Conversation.findOne({ [key]: value }).populate("messages");
};

const isExitsConversation = async (parId, creId, addUserLabel) => {
  if (addUserLabel === "singleChats") {
    return await Conversation.findOne({
      $or: [
        { "creator.userId": creId, "participant.userId": parId },
        { "creator.userId": parId, "participant.userId": creId },
      ],
    });
  }
};

/**
 * @description - This function create new conversation. default private or single conversation
 * @param {String} conName - Name of this conversation. default participant name
 * @param {Object} creator - This is creator object. It have username, userId, avatar property
 * @param {Object} participant - This is participant object. It have username, userId, avatar property
 * @returns {Promise} - new created conversation object is return
 */
const createNewConversation = async (conName, creator, participant) => {
  const payload = {
    conversationName: conName || participant.username,
    creator: creator,
    participant: participant,
  };

  const newCon = new Conversation(payload);
  await newCon.save();
  return newCon;
};

/**
 * @description - This function create new group conversation object
 * @param {Object} creator - LoggedIn user Object(id, username, avatar)
 * @param {Object} member - Group member Object(id, username, avatar)
 * @param {Boolean} isGroup - it is group or not
 * @param {String} groupName - group name. default name is genarated
 * @returns {Promise} - it return group new conversation object
 */
const createNewGroupConversation = async (
  creator,
  member,
  isGroup,
  groupName
) => {
  const newGroupCon = new Conversation({
    conversationName: groupName || `Group${strGenaretor(4)}`,
    creator: {
      userId: creator.userId,
      username: creator.username,
    },
    isGroup: isGroup,
    groupAvatar: "",
    groupMembers: [
      { userId: creator.userId, username: creator.username },
      { userId: member.userId, username: member.username },
    ],
  });

  await newGroupCon.save();
  return newGroupCon;
};

/**
 * @description - This function add new member in group conversation
 * @param {String} groupId - Conversation Id of a group
 * @param {object} member - This is member Object, which have username and userId property
 * @returns {Promise} - It returns updated group object
 */
const addNewMemberInGroup = async (groupId, member) => {
  return await Conversation.findByIdAndUpdate(groupId, member);
};

/**
 * @description - This function takes a image and update to conversation object in DB
 * @param {File} img - It take a image url or image file
 * @returns {Promise} - return this updated object
 */
const updateGroupImg = async (img) => {
  //TODO: upload image using multer
  //TODO: save to db and return object
};

/**
 * @description - This function is update conversation's message array
 * @param {String} conId - It is conversation Id
 * @param {String} msgId - It is message id which is newly created
 * @returns {Promise} - It returns the whole conversation object
 */
const updateMsgInCon = async (conId, msgId) => {
  await Conversation.updateOne({ _id: conId }, { $push: { messages: msgId } });
};

/**
 * @description - This function delete a group or a group conversation object
 * @param {String} groupId - Group Conversation id
 * @returns {Promise} - It delete a group conversation or group
 */
const deleteConversationById = async (groupId) => {
  return await Conversation.findByIdAndDelete(groupId);
};

// exports
module.exports = {
  getConversationByProperty,
  createNewConversation,
  createNewGroupConversation,
  addNewMemberInGroup,
  updateGroupImg,
  updateMsgInCon,
  isExitsConversation,
  deleteConversationById,
};
