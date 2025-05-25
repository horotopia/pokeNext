import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import logger from './Infrastructure/Express/config/logger.js'
import createError from 'http-errors'

import userRoutes from './interfaces/routes/userRoutes.js'
import errorHandler from './middlewares/errorHandler.js'

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

// Log chaque requête HTTP
app.use((req, res, next) => {
  logger.http(`${req.method} ${req.url}`)
  next()
})

app.use('/api/users', userRoutes)

// 404
app.use((req, res, next) => {
  logger.warn(`404 Not Found: ${req.method} ${req.url}`)
  next(createError(404, 'Not Found'))
})

// Error handler
app.use((err, req, res, next) => {
  logger.error(err.stack || err.message)
  errorHandler(err, req, res, next)
})

logger.info('Express app initialized')

export default app
