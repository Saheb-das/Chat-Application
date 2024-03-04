// internal imports
const signupController = require("../controllers/signupController");
const { signupValidator } = require("../middlewares/validator");

// external imports
const router = require("express").Router();

router.get("/", (_req, res) => {
  res.json({ message: "this is signup page" });
});

// post route
router.post("/", signupValidator, signupController);

// exports
module.exports = router;
