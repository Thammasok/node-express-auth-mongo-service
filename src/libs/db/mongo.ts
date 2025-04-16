import mongoose from 'mongoose'
import logger from '@/boot/logger'

export const mongoDBConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_MONGO_URL as string)
    logger.info('MongoDB Connected...')
  } catch (err) {
    logger.error('MongoDB Connection Error', err)
    process.exit(1)
  }
}

export const mongoDBCreateConnection = async () => {
  try {
    const connected = mongoose.createConnection(
      process.env.DATABASE_MONGO_URL as string,
    )
    connected.on('open', () => logger.info('MongoDB Connected...'))
    connected.on('error', (err) => {
      logger.error('MongoDB Connection Error', err)
      process.exit(1)
    })

    return connected
  } catch (err) {
    logger.error('MongoDB Connection Error', err)
    process.exit(1)
  }
}

export const mongoDBDisconnect = async () => {
  try {
    await mongoose.connection.close()
    logger.info('MongoDB Disconnected...')
  } catch (err) {
    logger.error('MongoDB Disconnection Error', err)
    process.exit(1)
  }
}
