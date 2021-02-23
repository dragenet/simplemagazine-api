import express from 'express'

import {
  loginUser,
  refreshTokens,
  logoutUser,
} from '../controllers/AuthController'

const user = express.Router()

user.post('/login', loginUser)
user.all('/refresh', refreshTokens)
user.get('/logout', logoutUser)

export default user
