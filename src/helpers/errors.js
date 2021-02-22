import httpStat from './httpStatus'

export default {
  default: {
    code: 'ERR_UNKNOW_ERROR',
    message: 'Unknow error',
    httpStatus: httpStat.internalError,
  },
  userExists: {
    code: 'ERR_USER_ALREADY_EXISTS',
    message: 'User with specified email already exists',
    httpStatus: httpStat.badRequest,
  },
  incorrectEmailOrPassword: {
    code: 'ERR_EMAIL_OR_PASS_INCORR',
    message: "Email/name doesn't exists or password is incorrect",
    httpStatus: httpStat.badRequest,
  },
  unauthenticated: {
    code: 'ERR_UNAUTHENTICATED',
    message: 'To access this resource please login or register',
    httpStatus: httpStat.unauthorized,
  },
}
