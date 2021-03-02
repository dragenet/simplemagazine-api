import wrap from 'express-async-wrapper'
import { User } from '@/models'
import { UserAdapter } from '@/adapters'
import { httpStatus, responses } from '@/utils'
import { clearTokenCookie, token_types } from '@/helpers'

export const updateUser = wrap(async (req, res) => {
  if (req.body.id) delete req.body.id

  const newUser = new User({ ...req.user, ...req.body })
  await UserAdapter.updateUser(newUser)
  const updatedUser = await UserAdapter.getUser(newUser)

  res
    .status(httpStatus.ok)
    .json(responses.userUpdatedSuccessfuly(updatedUser.get()))
})
