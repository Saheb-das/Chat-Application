// external imports
const router = require("express").Router();

// internal imports
const userController = require("../controllers/userController");

// to get user information
router.get("/:userId", userController.getUserById);

// to update user information
router.patch("/:userId", userController.addFavoriteInUser);

// exports
module.exports = router;
