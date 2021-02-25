import { User } from '@/models'
import { ControllerError, verifyToken } from '@/helpers'
import { errors } from '@/utils'

const redirectToRefresh = (req, res) => {
  res.cookie('back_referer', req.originalUrl)
  //TODO: Create path with api base uri env var
  res.redirect(307, '/api/auth/refresh')
}

export const authorized = (req, res, next) => {
  const accessToken = req.cookies.access_token
  const refreshToken = req.cookies.refresh_token

  if (!accessToken || accessToken === null) {
    if (!refreshToken || refreshToken === null) {
      throw new ControllerError(errors.unauthenticated)
    } else {
      return redirectToRefresh(req, res)
    }
  }

  try {
    const tokenData = verifyToken(accessToken)
    req.user = new User({ ...tokenData.data })
  } catch (err) {
    return redirectToRefresh(req, res)
  }

  next()
}
