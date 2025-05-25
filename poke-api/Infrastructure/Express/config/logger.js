import winston from 'winston'
import 'winston-daily-rotate-file'
import { config } from 'dotenv'

config()

const level = process.env.NODE_ENV === 'development' ? 'debug' : 'info'
const levels = { error: 0, warn: 1, info: 2, http: 3, debug: 5 }
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.errors({ stack: true }),
  winston.format.printf((info) => {
    const stack = info.stack ? `\nStack trace: ${info.stack}` : ''
    return `${info.level}: ${info.message}, timestamp : ${info.timestamp}${stack}`
  }),
)
winston.addColors(colors)

function createDailyRotateFile(filename, level) {
  return new winston.transports.DailyRotateFile({
    filename: `logs/${filename}-%DATE%.log`,
    level,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxFiles: '14d',
  })
}

function createTransports() {
  return [
    new winston.transports.Console(),
    createDailyRotateFile('api-combined'),
    createDailyRotateFile('api-error', 'error'),
    createDailyRotateFile('api-info', 'info'),
    createDailyRotateFile('api-http', 'http'),
  ]
}

function createExceptionHandlers() {
  return [
    new winston.transports.Console(),
    createDailyRotateFile('api-exceptions'),
  ]
}

const logger = winston.createLogger({
  level,
  levels,
  format,
  transports: createTransports(),
  exceptionHandlers: createExceptionHandlers(),
})

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise} reason: ${reason}`)
})

export default {
  error: (message) => logger.error(message),
  warn: (message) => logger.warn(message),
  info: (message) => logger.info(message),
  http: (message) => logger.log('http', message),
  debug: (message) => logger.debug(message),
  getLogger: () => logger,
}