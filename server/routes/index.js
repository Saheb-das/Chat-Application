// external routes
const router = require("express").Router();

// internal routes
const signupRouter = require("./signupRouter");
const loginRouter = require("./loginRouter");
const chatsRouter = require("./chatsRouter");
const profileRouter = require("./profileRouter");
const authenticate = require("../middlewares/authenticate");

// routes
router.use("/api/v1", signupRouter);
router.use("/api/v1/login", loginRouter);
router.use("/api/v1/chats", authenticate, chatsRouter);
router.use("/api/v1/profile", authenticate, profileRouter);

// exports
module.exports = router;
