//libs
import wrap from 'express-async-wrapper'

//models
import db from '@/db/models'
import User from '@/models/User'

//helpers
import { ControllerError } from '@/helpers'
import { errors, httpStatus } from '@/utils'

const checkIsUserExists = async user => {
  const res = await db.User.findAll({
    where: {
      email: user.email,
    },
  })
  if (res.length !== 0) return true
  else return false
}

export const registerUser = wrap(async (req, res) => {
  const user = req.body

  const isUserExists = await checkIsUserExists(user)
  if (isUserExists) throw new ControllerError(errors.userExists)

  const newUser = new User(user.name, user.email, user.password, null)

  const createdUser = await db.User.create(newUser)

  newUser.id = createdUser.id

  const responseJson = {
    message: 'User created',
    user: newUser.get(),
  }

  res.status(httpStatus.created).json(responseJson)
})
