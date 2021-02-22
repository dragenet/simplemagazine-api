import express from 'express'

import users from './users'
import auth from './auth'

const router = express.Router()

router.use('/user', users)
router.use('/auth', auth)

export default router
