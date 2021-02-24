import wrap from 'express-async-wrapper'
import db from '@/db/models'
import { ControllerError } from '@/helpers'
import { errors, httpStatus } from '@/utils'
import User from '@/models/User'

export const getUser = wrap(async (req, res) => {
  const dbUser = await db.User.findOne({
    where: {
      id: req.user.id,
    },
  })

  if (!dbUser || dbUser === null) throw new ControllerError(errors.default)

  const dbUserData = dbUser.dataValues

  const user = new User(dbUserData.name, dbUser.email, null, null, dbUser.id)

  res.status(httpStatus.ok).json(user.get())
})
