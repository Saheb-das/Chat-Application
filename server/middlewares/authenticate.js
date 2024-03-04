// external imports
const jwt = require("jsonwebtoken");

// internal imports
const userService = require("../services/user");
const customError = require("../utils/customError");

/**
 * @description This function is authenticate user
 */
const authenticate = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      customError("Unauthorized User", 400);
    }

    token = token.split(" ")[1];

    const decoded = jwt.verify(token, process.env.SECRETE_KEY);

    const user = await userService.getUserByProperty("_id", decoded._id);
    if (!user) customError("Invalid User", 400);

    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

// exports
module.exports = authenticate;
