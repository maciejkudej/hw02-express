import {
  AuthorizationError,
  RegistrationConflictError,
  UnauthorizedError,
} from "#helpers/errors.js";

const errorHandler = (error, req, res, next) => {
  if (
    error instanceof AuthorizationError ||
    error instanceof RegistrationConflictError ||
    error instanceof UnauthorizedError
  ) {
    console.log(res.status);
    return res.status(error.status).json({ message: error.message });
  }
  res.status(500).json({ message: error.message });
};

export { errorHandler };
