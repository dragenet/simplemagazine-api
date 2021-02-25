import jwt from 'jsonwebtoken'
import crypto from 'crypto'

export const token_types = {
  access: 'access',
  refresh: 'refresh',
}

export const isTypeValid = type => {
  if (type !== token_types.access && type !== token_types.refresh)
    throw Error('Token type unspecified')
}

const evalSecret = secret => {
  let jwtSecret
  if (secret && secret !== null) {
    jwtSecret = secret
  } else {
    jwtSecret = process.env.JWT_SECRET
  }
  return jwtSecret
}

const evalExpTime = tokenType =>
  process.env[`${tokenType.toUpperCase()}_TOKEN_EXPIRATION_TIME`]

export const genPayload = (data, tokenType) => {
  let payload = {
    type: tokenType,
    data,
  }

  payload.iat = Date.now()

  let randomizedPayload = Object.assign({}, payload)
  randomizedPayload.salt = crypto.randomBytes(256)
  payload.tokenId = crypto
    .createHash('sha256')
    .update(JSON.stringify(randomizedPayload))
    .digest('hex')

  return payload
}

export const genToken = (type, data, options, secret) => {
  isTypeValid(type)

  const jwtSecret = evalSecret(secret)

  const payload = genPayload(data, type)

  const opts = {
    expiresIn: evalExpTime(type),
    jwtid: payload.tokenId,
    ...options,
  }

  return { token: jwt.sign(payload, jwtSecret, opts), payload, opts }
}

export const verifyToken = (token, options, secret) => {
  const jwtSecret = evalSecret(secret)

  const opts = {
    algorithms: ['HS256'],
    clockTolerance: 10,
    ...options,
  }

  return jwt.verify(token, jwtSecret, opts)
}
