import wrap from 'express-async-wrapper'
import { httpStatus } from '@/utils'
import { UserAdapter } from '@/adapters'

export const getUser = wrap(async (req, res) => {
  const dbUser = await UserAdapter.getUser(req.user)

  res.status(httpStatus.ok).json(dbUser.get())
})
