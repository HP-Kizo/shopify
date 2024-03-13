exports.createError = (status = 500, message = "Something went wrongs!") => {
  const error = new Error();
  error.status = status;
  error.message = message;
  return error;
};
