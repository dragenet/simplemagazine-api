import express from 'express'

import { registerUser } from '../controllers/UserController'

const user = express.Router()

user.post('/', registerUser)

export default user
