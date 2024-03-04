// global middleware
const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.stack); // this for development and debug

  // set custom error object or message
  let errObj;
  if (err.message) {
    errObj = err.message;
  } else if (err.errors) {
    errObj = err.errors;
  } else {
    errObj = "Internal Server Error";
  }

  // response
  res.status(statusCode).json({
    success: false,
    error: errObj,
  });
};

// exports
module.exports = errorHandler;
