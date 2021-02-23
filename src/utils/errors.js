import { httpStatus } from './'

export const errors = {
  default: {
    code: 'ERR_UNKNOW_ERROR',
    message: 'Unknow error',
    httpStatus: httpStatus.internalError,
  },
  userExists: {
    code: 'ERR_USER_ALREADY_EXISTS',
    message: 'User with specified email already exists',
    httpStatus: httpStatus.badRequest,
  },
  incorrectEmailOrPassword: {
    code: 'ERR_EMAIL_OR_PASS_INCORR',
    message: "Email/name doesn't exists or password is incorrect",
    httpStatus: httpStatus.badRequest,
  },
  unauthenticated: {
    code: 'ERR_UNAUTHENTICATED',
    message: 'To access this resource please login or register',
    httpStatus: httpStatus.unauthorized,
  },
}
