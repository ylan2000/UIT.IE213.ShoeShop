const AppError = require('../utils/appError');

// transform the weird error from Mongoose into operational error with nice message 
const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}`;

  return new AppError(message, 400); // bad request
}

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    err.statusCode = err.statusCode || 500; // default: internal server error
    err.status = err.status || 'error';  
  } else {
    err.statusCode = 500; // default: internal server error
    err.status = 'error';
    err.message = 'Something went wrong!!'
  }

  return res.status(err.statusCode).render("pages/error", {
    title: err.statusCode + " error",
    message: err.message
  });
}

module.exports = (err, req, res, next) => {
  console.log(err.stack); // stack trace -> holds where error occur

  if (err.name === 'CastError') err = handleCastErrorDB(err);

  sendErrorProd(err, res);
}

