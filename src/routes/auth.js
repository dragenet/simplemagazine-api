import express from 'express'

import { loginUser } from '../controllers/AuthController'

const user = express.Router()

user.post('/login', loginUser)

export default user
