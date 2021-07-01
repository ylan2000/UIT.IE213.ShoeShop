const AppError = require('../utils/appError');

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;

  return new AppError(message, 400);
}

const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/);
  const message = `Duplicate field value: ${value}. Please use another value!`;
  
  return new AppError(message, 400);
}

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

  if (err.name === 'CastError') err = handleCastErrorDB(err); // invalid data error
  if (err.code === 11000) err = handleDuplicateFieldsDB(err); // duplicate data

  if (err.name === 'ValidationError') handleValidationErrorDB(err); // validation error

  sendErrorProd(err, res);
}

