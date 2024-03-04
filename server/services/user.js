// internal imports
const User = require("../models/User");

/**
 * get user by id or other field
 * @param {Stirng} key
 * @param {String} value
 * @returns {Promise}
 */
const getUserByProperty = (key, value) => {
  if (key === "_id") return User.findById(value);
  else return User.findOne({ [key]: value });
};

/**
 * @description create a new user
 * @param {Object} payload - this is user data object
 * @returns {Object }
 */
const createNewUser = (payload) => {
  const newUser = new User(payload);
  newUser.save();
  return newUser;
};

/**
 * @description - This function updates user property
 * @param {String} key - This is the field by which we can search user
 * @param {String} value - This is the value of above key
 * @param {String} field - which field is updated
 * @param {Object} payload - this is an object of basic info
 * @returns {Promise} - It return a promise
 */
const updateUserByProperty = (key, value, field, payload) => {
  if (key === "_id")
    return User.findByIdAndUpdate(
      { [key]: value },
      { $set: { [field]: payload } },
      { new: true }
    );
  else
    return User.findOneAndUpdate(
      { [key]: value },
      { $set: { [field]: payload } },
      { new: true }
    );
};

/**
 * @description - This function updates user property array element
 * @param {String} key - It is document field name
 * @param {String} value - It is document field's value
 * @param {String} field - updated field name
 * @param {Object} payload - updated payload
 * @returns {Object} - returns updated document
 */
const updateUserPropertyArray = (key, value, field, payload) => {
  if (key === "_id")
    return User.findByIdAndUpdate(
      { [key]: value },
      { $push: { [field]: payload } },
      { new: true }
    );
  else
    return User.findOneAndUpdate(
      { [key]: value },
      { $push: { [field]: payload } },
      { new: true }
    );
};

// delete user
const deleteUserByProperty = (key, value) => {
  if (key === "_id") return User.findByIdAndDelete(value);
  else return User.findOneAndDelete({ [key]: value });
};

// exports
module.exports = {
  getUserByProperty,
  createNewUser,
  updateUserByProperty,
  updateUserPropertyArray,
  deleteUserByProperty,
};
