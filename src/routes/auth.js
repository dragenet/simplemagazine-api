import express from 'express'

import { loginUser, refreshTokens } from '../controllers/AuthController'

const user = express.Router()

user.post('/login', loginUser)
user.use('/refresh', refreshTokens)

export default user
