// external imports
const router = require("express").Router();

// internal imports
const loginController = require("../controllers/loginController");
const { loginValidator } = require("../middlewares/validator");

// post route
router.post("/", loginValidator, loginController);

// exports
module.exports = router;
