import wrap from 'express-async-wrapper'

import { RefreshTokenAdapter } from '@/adapters'

import { errors, httpStatus, responses } from '@/utils'

import {
  ControllerError,
  genToken,
  token_types,
  verifyToken,
  setTokenCookie,
} from '@/helpers'

export const refreshTokens = wrap(async (req, res) => {
  const backReferer = req.cookies.back_referer
  const refreshToken = req.cookies.refresh_token

  res.clearCookie('back_referer')

  if (!refreshToken) throw new ControllerError(errors.unauthenticated)

  try {
    const tokenData = await verifyToken(refreshToken)

    const isTokenValid = await RefreshTokenAdapter.isTokenValid(tokenData)
    if (!isTokenValid) throw new ControllerError(errors.unauthenticated)

    await RefreshTokenAdapter.invalidateToken(tokenData)

    const { token: newAccessToken } = genToken(
      token_types.access,
      tokenData.data,
    )
    setTokenCookie(res, token_types.access, newAccessToken)

    const newRefreshToken = genToken(token_types.refresh, tokenData.data)

    await RefreshTokenAdapter.addToken(newRefreshToken)

    setTokenCookie(res, token_types.refresh, newRefreshToken.token)
  } catch (err) {
    console.log(err)
    throw new ControllerError(errors.unauthenticated)
  }

  if (!backReferer || backReferer === null) {
    res.status(httpStatus.ok).json(responses.tokenRegeneratedSuccessfuly)
  } else {
    res.redirect(307, backReferer)
  }
})
