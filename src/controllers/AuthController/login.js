//libs
import wrap from 'express-async-wrapper'
import ms from 'ms'

//models
import db from '../../db/models'
import User from '../../models/User'

//helpers
import ControllerError from '../../helpers/ControllerError'
import errors from '../../helpers/errors'
import httpStat from '../../helpers/httpStatus'
import { genToken, token_types } from '../../helpers/token'

const evalSecureCookie = () =>
  process.env.NODE_ENV === 'production' ? true : false

export const loginUser = wrap(async (req, res) => {
  const data = req.body

  if (
    !data.email ||
    data.email === null ||
    !data.password ||
    data.password === null
  )
    throw new ControllerError(errors.incorrectEmailOrPassword)

  let userRecord = await db.User.findOne({
    where: {
      email: data.email,
    },
  })

  if (userRecord === null)
    throw new ControllerError(errors.incorrectEmailOrPassword)

  const dbUser = userRecord.dataValues

  const user = new User(
    dbUser.name,
    dbUser.email,
    data.password,
    dbUser.passwordHash,
    dbUser.id,
  )

  const isPasswordCorrect = await user.verifyPassword()
  if (!isPasswordCorrect)
    throw new ControllerError(errors.incorrectEmailOrPassword)

  const [, authToken] = genToken(token_types.auth, user.get())
  const [refreshTokenId, refreshToken] = genToken(
    token_types.refresh,
    user.get(),
  )

  console.log(refreshTokenId)

  db.RefreshTokens.create({
    userId: user.id,
    tokenId: refreshTokenId,
  })

  let atCookieOpts = {
    httpOnly: true,
    maxAge: ms(process.env.AUTH_TOKEN_EXPIRATION_TIME),
    secure: evalSecureCookie(),
  }
  res.cookie('access_token', authToken, atCookieOpts)

  let rtCookieOpts = Object.assign({}, atCookieOpts)
  rtCookieOpts.maxAge = ms(process.env.REFRESH_TOKEN_EXPIRATION_TIME)
  res.cookie('refresh_token', refreshToken, rtCookieOpts)

  const successful = {
    message: 'User loged in',
    user: user.get(),
  }
  res.status(httpStat.ok).json(successful)
})
