import 'dotenv/config'
import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
// import limiter from '@/boot/rate-limit'
import customLogger from '@/boot/logger'
import generateRoute from '@/boot/router'
import config from '@/config'
import { mongoDBConnection } from '@/libs/db'
import useragent from 'express-useragent'
import errorMiddleware from '@/middleware/error.middleware'

const app: Application = express()

declare global {
  namespace Express {}
}

// view engine setup
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'hbs')

const corsOptions = {
  origin: config.ALLOWED_ORIGIN.CLIENT_URL,
}

app.use(cors(corsOptions))

// app.use(limiter)
app.use(useragent.express())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

// mongodb
mongoDBConnection()

// api/routes
generateRoute(app)

// Authentication fail
app.use(errorMiddleware)
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   res.status(err.status).json({
//     ...err,
//   })
// })

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(res.status(StatusCodes.NOT_FOUND).json({ msg: 'not found' }))
})

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  customLogger.info('Error handler')
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
