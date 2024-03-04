// external imports
const socketIO = require("socket.io");

// internal imports
const messageController = require("../controllers/messageController");
const conversationController = require("../controllers/conversationController");

/**
 * @description - This is main socketIO function.
 * @param {object} httpServer
 */
function socketHandler(httpServer) {
  const io = new socketIO.Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  // create different namespace
  const privateChat = io.of("/private");
  const groupChat = io.of("/group");
  const createChat = io.of("/chat");

  // set connection
  privateChat.on("connection", privateChatHandler);
  groupChat.on("connection", groupChatHandler);
  createChat.on("connection", createChatHandler);

  /**
   * @description - This function is a Namespace and responsible for new Conversation creation
   * @param {Object} socket - It is instance of client IO
   */
  function createChatHandler(socket) {
    console.log(`${socket.id} is connected (creator)`);

    socket.on("createConversation", async (data) => {
      const newCon = await conversationController.createConversation(data);
      createChat.emit("createdCon", newCon);
    });

    socket.on("disconnect", () => {
      console.log(`${socket.id} is disconnected (creator)`);
    });
  }

  /**
   * @description This function is a private Namespace of io.
   * @param {Object} socket - It is intance of client IO
   */
  function privateChatHandler(socket) {
    console.log(`${socket.id} is connected (private)`);

    socket.on("privateMsg", async (data) => {
      let updateMsg = await messageController.createNewMessage(data);
      privateChat.emit("privateMsgRcv", updateMsg);
    });

    socket.on("disconnect", () => {
      console.log(`${socket.id} is disconnected`);
    });
  }

  /**
   * @description This function is group Namespace of io.
   * @param {Object} socket - It is instance of client IO.
   */
  function groupChatHandler(socket) {
    console.log(`${socket.id} is connected (group)`);

    socket.on("groupMsg", async (data) => {
      let updateMsg = await messageController.createNewMessage(data);
      groupChat.emit("groupMsgRcv", updateMsg);
    });

    socket.on("disconnect", () => {
      console.log(`${socket.id} is disconnected`);
    });
  }
}

// exports
module.exports = socketHandler;
