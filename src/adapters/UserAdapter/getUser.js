import { Op } from 'sequelize'
import db from '@/db/models'

import { User } from '@/models'

export const getUser = async user => {
  if (!user.id) user.id = null
  if (!user.email) user.email = null

  let dbUser = await db.User.findOne({
    where: {
      [Op.or]: [{ id: user.id }, { email: user.email }],
    },
  })
  if (!dbUser) throw new Error('Cannot get user')
  return new User({ ...dbUser.dataValues, orm: dbUser })
}
