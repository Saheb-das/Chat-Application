/**
 * @description - This function take nested error object and return a simple error object
 * @param {Object} mappedError
 * @returns {Object}
 */
const rearrangeErrorObj = (mappedError) => {
  return Object.keys(mappedError).reduce((acc, cur) => {
    acc[cur.split(".")[0]] = mappedError[cur].msg;

    return acc;
  }, {});
};

// exports
module.exports = rearrangeErrorObj;
