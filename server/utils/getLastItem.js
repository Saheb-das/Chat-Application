/**
 * @description - This function gives last indexed object of an array
 * @param {Array} lists - It is an array of object
 * @returns {Object} - It returns last index object
 */
function getLastListItem(lists) {
  const lastIndex = lists.length - 1;
  return lists[lastIndex];
}

// exports
module.exports = getLastListItem;
