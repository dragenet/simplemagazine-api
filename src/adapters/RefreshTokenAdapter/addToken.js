import ms from 'ms'

import db from '@/db/models'

export const addToken = async token => {
  const res = await db.RefreshTokens.create({
    userId: token.payload.data.id,
    tokenId: token.payload.tokenId,
    expiresIn: new Date(Date.now() + ms(token.opts.expiresIn)).toISOString(),
  })
  if (!res) throw new Error('Cannot add token to db')
  return res
}
