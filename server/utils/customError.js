const customError = (errMsg = "", statusCode = null) => {
  const err = new Error();
  if (typeof errMsg === "string") {
    err.message = errMsg;
  } else {
    err.errors = errMsg;
  }
  err.statusCode = statusCode;
  throw err;
};

// exports
module.exports = customError;
