import express from 'express'

import { registerUser, getUser } from '@/controllers/UserController'
import { authorized } from '@/middlewares'

const user = express.Router()

user.get('/', authorized, getUser)
user.post('/', registerUser)

export default user
