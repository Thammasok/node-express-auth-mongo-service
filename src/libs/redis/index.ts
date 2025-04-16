import { createClient } from 'redis'
import { SetValueRedisDto } from './radis.dto'
import logger from '@/boot/logger'

const LOGGER_NAME = 'REDIS_LIBS:'

const redisConnection = async () => {
  const config = {
    url: process.env.REDIS_URL,
  }

  const client = await createClient(config)
    .on('error', (err) => console.log('Redis Client Error', err))
    .connect()

  return client
}

export const setValue = async ({ key, value }: SetValueRedisDto) => {
  try {
    const redis = await redisConnection()

    redis.set(key, value)
    redis.quit()

    return true
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw error
  }
}

export const getValue = async (key: string) => {
  try {
    const redis = await redisConnection()

    const result = await redis.get(key)
    redis.quit()

    if (result) {
      return JSON.parse(result)
    }

    return null
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw error
  }
}

export const deleteValue = async (key: string) => {
  try {
    const redis = await redisConnection()

    redis.del(key)
    redis.quit()

    return true
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw error
  }
}
