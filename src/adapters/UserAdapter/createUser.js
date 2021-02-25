import db from '@/db/models'
import { User } from '@/models'

export const createUser = async user => {
  const createdUserData = await db.User.create(user)
  const createdUser = new User({ ...createdUserData.dataValues })
  return createdUser
}
