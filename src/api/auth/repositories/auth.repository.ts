import config from '@/config'
import logger from '@/boot/logger'
import { DeleteResult, Error } from 'mongoose'
import {
  CreateNewAccountRepositoryDto,
  UpdateRequestResetPasswordRepositoryDto,
} from '@/api/auth/repositories/auth.repository.dto'
import { AccountModel } from '@/api/account/models/account.model'
import { AccountForgotPasswordModel } from '@/api/account/models/account-forgot-password.model'

const LOGGER_NAME = 'AUTH_REPO:'

export const createNewAccount = async (data: CreateNewAccountRepositoryDto) => {
  try {
    const account = await AccountModel.create({
      displayName: data.display_name,
      email: data.email,
      password: data.password,
      image: config.ACCOUNT.PROFILE_IMAGE_DEFAULT,
      passwordEnabled: 1,
      isVerify: 0,
      isRemove: 0,
    })

    return account
  } catch (error) {
    if (error instanceof Error) {
      // if (error.cause === 'P2002') {
      //   throw new TypeError('Email already exists')
      // }
      logger.error(LOGGER_NAME, 'Mongo Error: ', error)

      throw error
    } else {
      logger.error(LOGGER_NAME, error)

      throw error
    }
  }
}

export const getAccountById = async (id: string) => {
  try {
    const account = await AccountModel.findById({
      _id: id,
      isRemove: 0,
    })

    return account
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw error
  }
}

export const getAccountByEmail = async (email: string) => {
  try {
    const account = await AccountModel.findOne({
      email,
      isRemove: 0,
    })

    return account
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw error
  }
}

export const updatePassword = async (id: string, password: string) => {
  try {
    const account = await AccountModel.updateOne(
      {
        _id: id,
      },
      {
        password,
      },
    )

    return account
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw error
  }
}

export const updateVerifyAccount = async (id: string) => {
  try {
    const account = await AccountModel.updateOne(
      {
        _id: id,
      },
      {
        isVerify: 1,
      },
    )

    return account
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw error
  }
}

export const getRequestResetPasswordByToken = async (token: string) => {
  try {
    const resetToken = await AccountForgotPasswordModel.findOne({
      accountId: token,
    })

    return resetToken
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw error
  }
}

export const updateRequestResetPassword = async (
  data: UpdateRequestResetPasswordRepositoryDto,
) => {
  try {
    const account = await AccountForgotPasswordModel.updateOne(
      {
        accountId: data.accountId,
      },
      {
        accountId: data.accountId,
        token: data.token,
        expiredAt: data.expired,
      },
      {
        upsert: true,
      },
    )

    return account
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw error
  }
}

export const deleteRequestResetPassword = async (
  accountId: string,
): Promise<DeleteResult> => {
  try {
    const account = await AccountForgotPasswordModel.deleteOne({
      accountId,
    })

    return account
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw error
  }
}
