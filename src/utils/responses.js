export const responses = {
  userCreatedSuccessfuly: user => ({
    code: 'SUCCESS_USER_CREATED',
    message: 'User created successfuly',
    user,
  }),
  userUpdatedSuccessfuly: user => ({
    code: 'SUCCESS_USER_UPDATE',
    message: 'User updated succesfuly',
    user,
  }),
  userLogedinSuccessfuly: user => ({
    code: 'SUCCESS_USER_LOGGED_IN',
    message: 'User logged in successfuly',
    user,
  }),
  userLoggedoutSuccessfuly: {
    code: 'SUCCESS_USER_LOGGED_OUT',
    message: 'User logged out successfuly',
  },
  tokenRegeneratedSuccessfuly: {
    code: 'SUCCESS_TOKEN_REGENERATED',
    message: 'Tokens regenerated successfuly',
  },
}
