import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import routes from './routes'
import errorHandler from './helpers/errorHandler'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api', routes)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
