import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import routes from './routes'
import { errorHandler } from './helpers'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT || 4000
const entryPoint = '/api' || process.env.ENTRY_POINT

app.use(bodyParser.json())
app.use(cookieParser())

app.use(entryPoint, routes)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
