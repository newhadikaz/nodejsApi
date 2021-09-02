class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

const handleError = (err, res) => {
  
  const { statusCode, message } = err;
  if (err.isOperational) {
    res.status(statusCode).json({
    status: "error",
    statusCode,
    message
    });

  
  } else {  
      res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    });
  }
};

module.exports = {
  AppError,
  handleError
}
