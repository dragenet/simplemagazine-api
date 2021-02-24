//libs
import wrap from 'express-async-wrapper'
import ms from 'ms'

//models
import db from '@/db/models'
import User from '@/models/User'

//helpers
import {
  ControllerError,
  genToken,
  token_types,
  setTokenCookie,
} from '@/helpers'
import { errors, httpStat } from '@/utils'

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

  const [accessToken] = genToken(token_types.access, user.get())
  const [refreshToken, refreshTokenPayload, refreshTokenOpts] = genToken(
    token_types.refresh,
    user.get(),
  )

  db.RefreshTokens.create({
    userId: user.id,
    tokenId: refreshTokenPayload.tokenId,
    expiresIn: new Date(
      Date.now() + ms(refreshTokenOpts.expiresIn),
    ).toISOString(),
  })

  setTokenCookie(res, token_types.access, accessToken)

  setTokenCookie(res, token_types.refresh, refreshToken)

  const successful = {
    message: 'User loged in',
    user: user.get(),
  }
  res.status(httpStat.ok).json(successful)
})
