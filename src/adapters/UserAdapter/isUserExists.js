import db from '@/db/models'

/**
 * @typedef {import('@/models/User')} User
 */

/**
 * Check if specified user exists in database
 *
 * @param {User} user
 * @return {boolean} Returns true when user exits or false when doesn't
 */
export const isUserExists = async user => {
  const res = await db.User.findAll({
    where: {
      email: user.email,
    },
  })
  if (res.length !== 0) return true
  else return false
}
