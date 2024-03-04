// internal imports
const conversationService = require("../services/conversation");
const userService = require("../services/user");
const customError = require("../utils/customError");
const getLastListItem = require("../utils/getLastItem");

// to get conversation by id
const getConversationById = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const conversation = await conversationService.getConversationByProperty(
      "_id",
      userId
    );
    if (!conversation) customError("Invalid Conversation", 400);

    res.status(200).json({ success: true, conversation });
  } catch (e) {
    next(e);
  }
};

// create new conversation
const createConversation = async (data) => {
  // destructure data from req body
  const { userLabelIn, groupName, creator, isGroup, phone, nameAs } = data;

  // check user is valid or not
  const user = await userService.getUserByProperty("phoneNumber", phone);
  if (!user) customError("User not found", 400);

  // check conversation exits or not
  const conversation = await conversationService.isExitsConversation(
    user._id,
    creator.userId,
    userLabelIn
  );
  if (conversation) customError("Conversation already exits", 400);

  // check conversation is valid or not
  const isValidCon = await conversationService.getConversationByProperty(
    "conversationName",
    groupName
  );
  if (isValidCon)
    customError("Conversation is already exists. Try another one");

  // create participant object
  const participant = {
    userId: user._id,
    username: nameAs || user.username,
    avatar: user.avatar || "",
  };

  // TODO: this if-else code will updated in future

  // group or private chat create
  if (isGroup) {
    const newConversation =
      await conversationService.createNewGroupConversation(
        creator,
        participant,
        isGroup,
        groupName
      );

    // custom group object created for update users details
    const customGroupDetails = {
      conversationId: newConversation._id,
      name: newConversation.conversationName,
      avatar: newConversation.groupAvatar,
    };

    // creator details update
    const updatedCreator = await userService.updateUserPropertyArray(
      "_id",
      creator.userId,
      userLabelIn,
      customGroupDetails
    );
    if (!updatedCreator) customError("User not updated", 500);

    // participant details update
    const updatedParticipant = await userService.updateUserPropertyArray(
      "_id",
      participant.userId,
      userLabelIn,
      customGroupDetails
    );
    if (!updatedParticipant) customError("User not updated", 500);

    // response back
    return {
      success: "ok",
      creator: {
        userId: updatedCreator._id,
        username: updatedCreator.username,
        lists: updatedCreator[userLabelIn],
      },
      participant: {
        userId: updatedParticipant._id,
        username: updatedParticipant.username,
        lists: updatedParticipant[userLabelIn],
      },
      isGroup: true,
      field: userLabelIn,
    };
  } else {
    const newConversation = await conversationService.createNewConversation(
      nameAs,
      creator,
      participant
    );

    // save to user property lists
    const customCreatorPayload = {
      conversationId: newConversation._id,
      name: newConversation.conversationName,
      avatar: "",
    };

    // creator details update
    const updatedCreator = await userService.updateUserPropertyArray(
      "_id",
      creator.userId,
      userLabelIn,
      customCreatorPayload
    );
    if (!updatedCreator) customError("User not updated", 500);

    // save to participant property lists
    const customParticipantPayload = {
      conversationId: newConversation._id,
      name: nameAs || creator.username,
      avatar: "",
    };

    // participant details update
    const updatedParticipant = await userService.updateUserPropertyArray(
      "_id",
      participant.userId,
      userLabelIn,
      customParticipantPayload
    );
    if (!updateParticipant) customError("User not updated", 500);

    // response back
    return {
      success: "ok",
      creator: {
        userId: updatedCreator._id,
        username: updatedCreator.username,
        lists: updatedCreator[userLabelIn],
      },
      participant: {
        userId: updatedParticipant._id,
        username: updatedParticipant.username,
        lists: updatedParticipant[userLabelIn],
      },
      isGroup: false,
      field: userLabelIn,
    };
  }
};

// update conversation
const updateConversation = async (req, res, next) => {
  try {
    //TODO: make profile different route

    // find valid user

    //TODO: process data and then decide
    //TODO: it will update image or other property

    const updatedConversation = await conversationService.addNewMemberInGroup();

    res.status(200).json({ success: true, updatedConversation });
  } catch (e) {
    next(e);
  }
};

// delete conversation
const deleteConversation = async (req, res, next) => {
  try {
    const id = req.params;
    const deletedConversation =
      await conversationService.deleteConversationById();
    res.status(200).json({
      success: true,
      message: "Conversation is succesfully deleted",
      deleteConversation,
    });
  } catch (e) {
    next(e);
  }
};

// exports
module.exports = {
  getConversationById,
  createConversation,
  updateConversation,
  deleteConversation,
};
