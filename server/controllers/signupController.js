// external imports
const { validationResult } = require("express-validator");

// internal imports
const userService = require("../services/user");
const customError = require("../utils/customError");
const { hashPassword } = require("../utils/hashPassword");
const rearrangeErrorObj = require("../utils/rearrangErrorObj");

// create signup controller
const signupController = async (req, res, next) => {
  const { fullname, email, phone: phoneNumber, password } = req.body;

  try {
    const mappedError = validationResult(req).mapped();
    const customMappedError = rearrangeErrorObj(mappedError);
    if (Object.keys(customMappedError).length !== 0)
      customError(customMappedError, 400);

    const userEmail = await userService.getUserByProperty("email", email.data);
    if (userEmail) customError("Email already exsist", 400);

    const userNumber = await userService.getUserByProperty(
      "phoneNumber",
      phoneNumber.data
    );
    if (userNumber) customError("Mobile Number already exsist", 400);

    const hashedPassword = await hashPassword(password.data);

    const userPayload = {
      username: fullname.data,
      email: email.data,
      phoneNumber: phoneNumber.data,
      password: hashedPassword,
    };

    const newUser = await userService.createNewUser(userPayload);

    res
      .status(200)
      .json({ success: true, message: "User Successfully Created" });
  } catch (e) {
    next(e);
  }
};

// exports
module.exports = signupController;
