import ms from 'ms'
import { isTypeValid } from './token'

const evalSecureCookie = () =>
  process.env.NODE_ENV === 'production' ? true : false

const cookieOpts = type => {
  isTypeValid(type)
  return {
    httpOnly: true,
    maxAge: ms(process.env[`${type.toUpperCase()}_TOKEN_EXPIRATION_TIME`]),
    secure: evalSecureCookie(),
  }
}

export const setTokenCookie = (res, type, token) => {
  isTypeValid(type)

  let opts = cookieOpts(type)
  res.cookie(`${type}_token`, token, opts)
}

export const clearTokenCookie = (res, type) => {
  isTypeValid(type)
  const opts = cookieOpts(type)
  delete opts.maxAge
  res.clearCookie(`${type}_token`, opts)
}
