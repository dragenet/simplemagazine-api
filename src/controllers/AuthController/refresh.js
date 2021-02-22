import wrap from 'express-async-wrapper'
import ms from 'ms'
import db from '../../db/models'
import ControllerError from '../../helpers/ControllerError'
import errors from '../../helpers/errors'
import httpStat from '../../helpers/httpStatus'
import setTokenCookie from '../../helpers/setTokenCookies'
import { genToken, token_types, verifyToken } from '../../helpers/token'

export const refreshTokens = wrap(async (req, res) => {
  const backReferer = req.cookies.back_referer
  const refreshToken = req.cookies.refresh_token

  res.clearCookie('back_referer')

  if (!refreshToken || refreshToken === null)
    throw new ControllerError(errors.unauthenticated)

  try {
    const tokenData = verifyToken(refreshToken)

    const tokenDbRecord = await db.RefreshTokens.findOne({
      where: {
        tokenId: tokenData.tokenId,
      },
    })

    if (tokenDbRecord === null || tokenDbRecord.dataValues.isValid !== true)
      throw new ControllerError(errors.unauthenticated)

    await db.RefreshTokens.update(
      {
        isValid: false,
      },
      {
        where: {
          tokenId: tokenData.tokenId,
        },
      },
    )

    const [newAccessToken] = genToken(token_types.access, tokenData.data)
    setTokenCookie(res, token_types.access, newAccessToken)

    const [
      newRefreshToken,
      newRefreshTokenPayload,
      newRefreshTokenOpts,
    ] = genToken(token_types.refresh, tokenData.data)

    db.RefreshTokens.create({
      userId: tokenData.data.id,
      tokenId: newRefreshTokenPayload.tokenId,
      expiresIn: new Date(
        Date.now() + ms(newRefreshTokenOpts.expiresIn),
      ).toISOString(),
    })

    setTokenCookie(res, token_types.refresh, newRefreshToken)
  } catch (err) {
    throw new ControllerError(errors.unauthenticated)
  }
  if (!backReferer || backReferer === null) {
    const successful = {
      message: 'Tokens regenerated successfuly',
    }
    res.status(httpStat.ok).json(successful)
  } else {
    res.redirect(307, backReferer)
  }
})
