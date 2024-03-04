// external imports
const { check } = require("express-validator");

// create sign up validators
const signupValidator = [
  check("fullname.data").not().isEmpty().withMessage("Invalid Name").trim(),
  check("email.data")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email"),
  check("phone.data")
    .not()
    .isEmpty()
    .withMessage("Number is required")
    .isMobilePhone("en-IN")
    .withMessage("Invalid Mobile Number"),
  check("password.data")
    .not()
    .isEmpty()
    .withMessage("Password must be required")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must contain 1 uppercase, 1 lowercase, 1 number and 1 symbol"
    ),
];

// create login validator
const loginValidator = [
  check("phone.data")
    .not()
    .isEmpty()
    .withMessage("Number is required")
    .isMobilePhone("en-IN")
    .withMessage("Invalid Credentials"),
  check("password.data")
    .not()
    .isEmpty()
    .withMessage("Password must be required")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage("Invalid Credentials"),
];

module.exports = {
  signupValidator,
  loginValidator,
};
