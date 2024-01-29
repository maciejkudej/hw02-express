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
    return res.status(error.status).json({ message: error.message });
  }
  return res.status(500).json({ message: error.message });
};

export { errorHandler };
