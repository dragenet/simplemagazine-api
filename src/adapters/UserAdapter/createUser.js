import db from '@/db/models'
import { User } from '@/models'

/**
 * @typedef {import {User} from '@/models'} User
 */
/**
 * createUser.
 * Inser new User into database.
 *
 * @param {User} user
 * @return {User}
 */
export const createUser = async user => {
  const createdUserData = await db.User.create(user)
  const createdUser = new User({ ...createdUserData.dataValues })
  return createdUser
}
