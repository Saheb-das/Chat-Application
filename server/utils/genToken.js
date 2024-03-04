// external imports
const jwt = require("jsonwebtoken");

/**
 *
 * @param {object} payload - user basic data which is public
 * @returns {String}
 */
const genToken = (payload) => {
  return `Bearer ${jwt.sign(payload, process.env.SECRETE_KEY)}`;
};

module.exports = genToken;
