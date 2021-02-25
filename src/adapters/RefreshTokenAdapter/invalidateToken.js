import jwt from 'jsonwebtoken'
import db from '@/db/models'

export const invalidateToken = async tokenData => {
  const tokenDb = await db.RefreshTokens.findOne({
    where: {
      tokenId: tokenData.tokenId,
    },
  })

  if (!tokenDb) return true

  const tokenTime = new Date(tokenDb.dataValues.expiresIn).getTime()
  if (tokenTime < Date.now()) await tokenDb.delete()
  else await tokenDb.update({ isValid: false })
  return true
}
