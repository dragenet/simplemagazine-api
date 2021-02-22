import httpStat from './httpStatus'

export default {
  default: {
    code: 'UNKNOW_ERROR',
    message: 'Unknow error',
    httpStatus: httpStat.internalError,
  },
  userExists: {
    code: 'USER_ALREADY_EXISTS',
    message: 'User with specified email already exists',
    httpStatus: httpStat.badRequest,
  },
  incorrectEmailOrPassword: {
    code: 'EMAIL_OR_PASS_INCORR',
    message: "Email/name doesn't exists or password is incorrect",
    httpStatus: httpStat.badRequest,
  },
}
