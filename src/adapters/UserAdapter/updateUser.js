import db from '@/db/models'
import { User } from '@/models'

export const updateUser = async user => {
  const updatedUserData = await db.User.update(user.getDangerously(), {
    where: {
      id: user.id,
    },
  })
  console.log(updatedUserData)
  if (!updatedUserData) throw new Error('User update error')
  return new User({ ...updatedUserData.dataValues })
}
