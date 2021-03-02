import express from 'express'

import { registerUser, getUser, updateUser } from '@/controllers/UserController'
import { authorized } from '@/middlewares'

const user = express.Router()

user.get('/', authorized, getUser)
user.post('/', registerUser)
user.put('/', authorized, updateUser)

export default user
