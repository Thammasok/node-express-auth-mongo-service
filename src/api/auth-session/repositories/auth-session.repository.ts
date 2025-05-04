import logger from '@/boot/logger'
import {
  CreateAuthSessionRepositoryDto,
  GetAuthSessionsByAccountIdRepositoryDto,
  UpdateAuthSessionRepositoryDto,
} from '@/api/auth-session/repositories/auth-session.repository.dto'
import {
  AuthSessionModel,
  EAuthSessionStatus,
} from '@/api/auth-session/models/auth-session.model'

const LOGGER_NAME = 'AUTH_SESSION_REPO:'

export const createAuthSession = async ({
  accountId,
  deviceId,
  ipAddress,
  ipInfo,
  userAgent,
}: CreateAuthSessionRepositoryDto) => {
  try {
    const account = await AuthSessionModel.create({
      accountId,
      deviceId,
      status: EAuthSessionStatus.ACTIVE,
      ip: ipAddress,
      userAgent: JSON.stringify(userAgent) || '',
      ipInfo: JSON.stringify(ipInfo),
    })

    return account
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw error
  }
}

export const updateAuthSession = async ({
  id,
  ipAddress,
  userAgent,
  ipInfo,
}: UpdateAuthSessionRepositoryDto) => {
  try {
    const account = await AuthSessionModel.findByIdAndUpdate(
      id,
      {
        ip: ipAddress,
        userAgent: JSON.stringify(userAgent) || '',
        ipInfo: JSON.stringify(ipInfo),
      },
      { new: true },
    )

    return account
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw error
  }
}

export const deactivateAuthSession = async (id: string) => {
  try {
    const session = await AuthSessionModel.findByIdAndUpdate(
      id,
      {
        status: EAuthSessionStatus.DEACTIVATE,
      },
      { new: true },
    )

    return session
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw error
  }
}

export const deactivateAuthSessionByAccountIdAndDeviceId = async ({
  accountId,
  deviceId,
}: {
  accountId: string
  deviceId: string
}) => {
  try {
    const session = await AuthSessionModel.updateMany(
      {
        accountId,
        deviceId,
      },
      {
        status: EAuthSessionStatus.DEACTIVATE,
      },
      { new: true },
    )

    return session
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw error
  }
}

export const deactivateAuthSessionByAccountIdAndSessionId = async ({
  accountId,
  sessionId,
  deviceId,
}: {
  accountId: string
  sessionId: string
  deviceId: string
}) => {
  try {
    const session = await AuthSessionModel.updateMany(
      {
        _id: sessionId,
        accountId,
        $ne: { deviceId },
      },
      {
        status: EAuthSessionStatus.DEACTIVATE,
      },
      { new: true },
    )

    return session
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw error
  }
}

export const getAuthSessionById = async (id: string) => {
  try {
    const session = await AuthSessionModel.findById(id)

    return session
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw error
  }
}

export const getAuthSessionsAllByAccountIdAndDeviceId = async ({
  accountId,
  deviceId,
}: {
  accountId: string
  deviceId: string
}) => {
  try {
    const sessions = await AuthSessionModel.find({
      accountId,
      deviceId,
    })

    return sessions
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw error
  }
}

export const getAuthSessionsAllByAccountId = async ({
  accountId,
  page,
  limit,
}: GetAuthSessionsByAccountIdRepositoryDto) => {
  try {
    const sessions = await AuthSessionModel.find({
      accountId,
    })
      .sort({
        createdAt: -1, // sort by createdAt desc
      })
      .skip((page - 1) * limit)
      .limit(limit)

    return sessions
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw error
  }
}

export const getAuthSessionsActiveByAccountId = async (accountId: string) => {
  try {
    const sessions = await AuthSessionModel.find({
      accountId,
      status: EAuthSessionStatus.ACTIVE,
    }).sort({
      createdAt: 1, // sort by createdAt asc
    })

    return sessions
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw error
  }
}

export const getAuthSessionsActiveByAccountIdAndDeviceId = async ({
  accountId,
  deviceId,
}: {
  accountId: string
  deviceId: string
}) => {
  try {
    const sessions = await AuthSessionModel.find({
      accountId,
      deviceId,
      status: EAuthSessionStatus.ACTIVE,
    }).sort({
      createdAt: 1, // sort by createdAt asc
    })

    return sessions
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw error
  }
}
