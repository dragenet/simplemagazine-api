import express from 'express'

import {
  registerUser,
  getUser,
  updateUser,
  removeUser,
} from '@/controllers/UserController'
import { authorized } from '@/middlewares'

const user = express.Router()

user.get('/', authorized, getUser)
user.post('/', registerUser)
user.put('/', authorized, updateUser)
user.delete('/', authorized, removeUser)

export default user
