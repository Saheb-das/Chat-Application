// external imports
const router = require("express").Router();

// internal imports
const conversationController = require("../controllers/conversationController");
const messageController = require("../controllers/messageController");

// get a conversation by id
router.get("/:userId", conversationController.getConversationById);

// add user into conversation list
router.post("/", conversationController.createConversation);

// create new message
// router.post("/:conversationId", messageController.createNewMessage);

// update user
router.patch("/:userId", conversationController.updateConversation);

// delete a existing conversation
router.delete("/:userId", conversationController.deleteConversation);

// exports
module.exports = router;
