import * as winston from 'winston'

const { combine, timestamp, errors, printf, colorize } = winston.format

const env: string = process.env.NODE_ENV || 'development'

const levels = {
  emerg: 0,
  alert: 1,
  crit: 2,
  error: 3,
  warning: 4,
  warn: 4,
  notice: 5,
  http: 5,
  info: 6,
  debug: 7,
}

const severity: Record<string, string> = {
  debug: 'DEBUG',
  info: 'INFO',
  notice: 'NOTICE',
  http: 'NOTICE',
  warn: 'WARNING',
  warning: 'WARNING',
  error: 'ERROR',
  crit: 'CRITIAL',
  alert: 'ALERT',
  emerg: 'EMERGENCY',
}

const level = (): string => {
  const isDevelopment = !!(
    env === 'development' ||
    env === 'develop' ||
    env === 'local'
  )
  return isDevelopment ? 'debug' : 'info'
}

const localPrint = printf((info) => {
  const log = `${info.level}: ${info.message}`
  return info.stack ? `${log}\n${info.stack}` : log
})

const format = combine(
  errors({ stack: true }),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  colorize({ all: env === 'local' }),
  localPrint,
)

const transports = [
  new winston.transports.Console({
    silent: !!(
      process.argv.indexOf('--silent') >= 0 || process.argv.indexOf('test')
    ),
  }),
  // new winston.transports.File({
  //   filename: 'logs/combined.log',
  //   format: combine(
  //     winston.format.json(),
  //   ),
  // }),
]

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
  exitOnError: true,
})

if (env !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  )
}

export default logger
