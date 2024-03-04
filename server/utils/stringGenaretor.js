/**
 * @description - This function ganerate random string
 * @param {Number} length - No. Of Character to genarate
 * @returns {String} - It return a string
 */
const randomStringGenaretor = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
};

// export
module.exports = randomStringGenaretor;
