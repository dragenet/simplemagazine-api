import db from '@/db/models'

export const isTokenValid = async tokenData => {
  const tokenDbRecord = await db.RefreshTokens.findOne({
    where: {
      tokenId: tokenData.tokenId,
    },
  })
  return tokenDbRecord && tokenDbRecord.dataValues.isValid ? true : false
}
