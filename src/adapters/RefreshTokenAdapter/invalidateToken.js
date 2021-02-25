import jwt from 'jsonwebtoken'
import db from '@/db/models'

export const invalidateToken = async token => {
  const tokenEnc = jwt.decode(token)

  const tokenDb = await db.RefreshTokens.findOne({
    where: {
      tokenId: tokenEnc.tokenId,
    },
  })

  if (!tokenDb) return true

  const tokenTime = new Date(tokenDb.dataValues.expiresIn).getTime()
  if (tokenTime < Date.now()) await tokenDb.delete()
  else await tokenDb.update({ isValid: false })
  return true
}
