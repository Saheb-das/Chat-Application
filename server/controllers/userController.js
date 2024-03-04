// internal imports
const userService = require("../services/user");
const conversationService = require("../services/conversation");
const customError = require("../utils/customError");

//get user by id
const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await userService.getUserByProperty("_id", userId);
    if (!user) return customError("Invalid User", 400);

    res.status(200).json({ success: true, message: "User found", user });
  } catch (e) {
    next(e);
  }
};

// update user by id
const addFavoriteInUser = async (req, res, next) => {
  try {
    const { userLabelIn, nameAs, conversationName } = req.body;

    // check valid conversation or not
    const conversation = await conversationService.getConversationByProperty(
      "conversationName",
      conversationName
    );
    if (!conversation) customError("There is no conversation", 400);

    // make updated payload
    const customPayload = {
      conversationId: conversation._id,
      name: nameAs || conversation.conversationName,
      avatar: conversation.avatar || "",
    };

    const updatedUser = await userService.updateUserPropertyArray(
      "_id",
      req.params.userId,
      userLabelIn,
      customPayload
    );
    res.status(200).json({
      success: true,
      message: "Update Successfully",
      field: userLabelIn,
      updatedUser: updatedUser,
    });
  } catch (e) {
    next(e);
  }
};

// delete user by id
const deleteUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await userService.getUserByProperty("_id", userId);
    if (!user) return customError("Invalid User", 400);

    const deletedUser = await userService.deleteUserByProperty("_id", userId);

    res.status(200).json({
      success: true,
      message: "User deleted Successfully",
      user: deletedUser,
    });
  } catch (e) {
    next(e);
  }
};

// exports
module.exports = {
  getUserById,
  addFavoriteInUser,
  deleteUserById,
};
