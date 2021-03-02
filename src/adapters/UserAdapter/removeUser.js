import db from '@/db/models'

export const removeUser = async user => {
  const res = await db.User.update(
    { name: 'unknow', email: 'unknow', passwordHash: '' },
    {
      where: {
        id: user.id,
      },
    },
  )
  if (!res) throw new Error('User remove error')
  return true
}
