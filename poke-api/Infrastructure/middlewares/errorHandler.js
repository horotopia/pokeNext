import logger from '../Express/config/logger.js'

export default function errorHandler(err, req, res, next) {
  logger.error(err.stack || err.message)
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}
