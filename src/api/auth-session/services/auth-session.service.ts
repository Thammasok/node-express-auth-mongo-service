import config from '@/config'
import logger from '@/boot/logger'
import * as AuthSessionRepository from '@/api/auth-session/repositories/auth-session.repository'
import { CreateAuthSessionServiceDto } from '@/api/auth-session/services/auth-session.service.dto'

const LOGGER_NAME = 'AUTH_SESSION_SERVICE:'

export const createAuthSession = async ({
  accountId,
  deviceId,
  ipAddress,
  ipInfo,
  userAgent,
}: CreateAuthSessionServiceDto) => {
  try {
    // 1. Get sesseion active by account id and device id
    const session =
      await AuthSessionRepository.getAuthSessionsActiveByAccountIdAndDeviceId({
        accountId,
        deviceId: deviceId as string,
      })

    // 2. Device id of account id is active
    // If not have session, create new session
    if (session.length === 0) {
      // Get all device active
      const devicesActive =
        await AuthSessionRepository.getAuthSessionsActiveByAccountId(accountId)

      const deviceNumber = devicesActive.length

      // 3. Device number is less than max device login
      // If true, create new session
      if (deviceNumber < config.AUTH.SESSION.MAX_DEVICE_LOGIN) {
        const newSession = await AuthSessionRepository.createAuthSession({
          accountId,
          deviceId,
          ipAddress,
          userAgent,
          ipInfo,
        })

        return newSession
      } else {
        // 4. Device number is more than max device login
        // Deactivate the longest lasting device is Deactive
        await AuthSessionRepository.deactivateAuthSession(
          devicesActive[0].id as string,
        )

        const createdSession = await AuthSessionRepository.createAuthSession({
          accountId,
          deviceId,
          ipAddress,
          userAgent,
          ipInfo,
        })

        return createdSession
      }
    }
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw error
  }
}
