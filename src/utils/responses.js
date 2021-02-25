export const responses = {
  userCreatedSuccessfuly: user => ({
    code: 'SUCCESS_USER_CREATED',
    message: 'User created successfuly',
    user,
  }),
  userLogedinSuccessfuly: user => ({
    code: 'SUCCESS_USER_LOGGED_IN',
    message: 'User logged in successfuly',
    user,
  }),
}
