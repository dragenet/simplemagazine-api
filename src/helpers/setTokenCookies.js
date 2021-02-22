import ms from 'ms'
import { isTypeValid } from './token'

const evalSecureCookie = () =>
  process.env.NODE_ENV === 'production' ? true : false

const setTokenCookie = (res, type, token) => {
  isTypeValid(type)

  let opts = {
    httpOnly: true,
    maxAge: ms(process.env[`${type.toUpperCase()}_TOKEN_EXPIRATION_TIME`]),
    secure: evalSecureCookie(),
  }
  res.cookie(`${type}_token`, token, opts)
}

export default setTokenCookie
