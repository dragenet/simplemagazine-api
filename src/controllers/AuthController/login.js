//libs
import wrap from 'express-async-wrapper'
import ms from 'ms'
//

import db from '@/db/models'
import { User } from '@/models'

import { UserAdapter, RefreshTokenAdapter } from '@/adapters'

import {
  ControllerError,
  genToken,
  token_types,
  setTokenCookie,
} from '@/helpers'

import { errors, httpStatus, responses } from '@/utils'

export const loginUser = wrap(async (req, res) => {
  const recvUser = new User({ ...req.body }, ['email', 'password'])

  let user
  try {
    user = await UserAdapter.getUser(recvUser)
  } catch (err) {
    throw new ControllerError(errors.incorrectEmailOrPassword)
  }

  user.extend({
    password: recvUser.password,
  })

  const isPasswordCorrect = await user.verifyPassword()
  if (!isPasswordCorrect)
    throw new ControllerError(errors.incorrectEmailOrPassword)

  const { token: accessToken } = genToken(token_types.access, user.get())
  setTokenCookie(res, token_types.access, accessToken)

  const refreshToken = genToken(token_types.refresh, user.get())
  RefreshTokenAdapter.addToken(refreshToken)
  setTokenCookie(res, token_types.refresh, refreshToken.token)

  res.status(httpStatus.ok).json(responses.userLogedinSuccessfuly(user.get()))
})
