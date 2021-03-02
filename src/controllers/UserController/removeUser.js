import wrap from 'express-async-wrapper'
import { User } from '@/models'
import { UserAdapter } from '@/adapters'
import { httpStatus, responses } from '@/utils'
import { clearTokenCookie, token_types } from '@/helpers'

export const removeUser = wrap(async (req, res) => {
  if (req.body.id) delete req.body.id
  const newUser = new User({ ...req.user, ...req.body })
  await UserAdapter.removeUser(newUser)

  clearTokenCookie(res, token_types.access)
  clearTokenCookie(res, token_types.refresh)

  res.status(httpStatus.ok).json(responses.userRemovedSuccessfuly)
})
