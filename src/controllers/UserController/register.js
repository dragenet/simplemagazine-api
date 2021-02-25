//libs
import wrap from 'express-async-wrapper'

//models
import { User } from '@/models'

//adapters
import { UserAdapter } from '@/adapters'

//helpers
import { ControllerError } from '@/helpers'
import { errors, httpStatus, responses } from '@/utils'

export const registerUser = wrap(async (req, res) => {
  const user = req.body

  const isUserExists = await UserAdapter.isUserExists(user)
  if (isUserExists) throw new ControllerError(errors.userExists)

  const { name, email, password } = user
  const newUser = new User({ name, email, password })

  const createdUser = await UserAdapter.createUser(newUser)

  res
    .status(httpStatus.created)
    .json(responses.userCreatedSuccessfuly(createdUser.get()))
})
