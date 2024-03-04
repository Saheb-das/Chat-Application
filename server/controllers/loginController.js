// external imports
const { validationResult } = require("express-validator");

// internal imports
const userService = require("../services/user");
const customError = require("../utils/customError");
const { comparePassword } = require("../utils/hashPassword");
const genToken = require("../utils/genToken");
const rearrangeErrorObj = require("../utils/rearrangErrorObj");

// login controller function
const loginController = async (req, res, next) => {
  const { phone: phoneNumber, password } = req.body;

  try {
    const mappedError = validationResult(req).mapped();
    const customMappedError = rearrangeErrorObj(mappedError);
    if (Object.keys(customMappedError).length !== 0)
      customError(customMappedError, 400);

    const user = await userService.getUserByProperty(
      "phoneNumber",
      phoneNumber.data
    );
    if (!user) customError("Invalid Credentials", 400);

    const isValidPassword = await comparePassword(password.data, user.password);
    if (!isValidPassword) customError("Invalid Credentials", 400);

    const payload = {
      _id: user._id,
      username: user.username,
      phoneNumber: user.phoneNumber,
    };

    const token = genToken(payload);

    res.status(200).json({
      success: true,
      message: "Login Successfull",
      token,
      loggedInUser: user,
    });
  } catch (e) {
    next(e);
  }
};

// exports
module.exports = loginController;
