// external imports
const bcrypt = require("bcrypt");

/**
 * For hashing password,this function is used
 * @param {String} password - this is user password
 * @param {Number} saltRound - this is number of salt round
 * @returns {String}
 */
const hashPassword = async (password, saltRound = 10) => {
  const salt = await bcrypt.genSalt(saltRound);
  const hashedPassword = await bcrypt.hash(password.toString(), salt);
  return hashedPassword;
};

/**
 * For checking that user given password and encrypted password are same or not
 * @param {String} password - this is user password
 * @returns {boolean}
 */
const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password.toString(), hashedPassword);
  return isMatch;
};

// exports
module.exports = {
  hashPassword,
  comparePassword,
};
