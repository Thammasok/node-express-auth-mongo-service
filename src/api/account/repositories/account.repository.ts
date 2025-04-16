import { StatusCodes } from 'http-status-codes'
import logger from '@/boot/logger'
import ErrorException from '@/exceptions/ErrorException'
import { AccountModel } from '@/api/account/models/account.model'
import { UpdateAccountImageUrlRepositoryDto } from '@/api/account/repositories/account.repository.dto'

const LOGGER_NAME = 'ACCOUNT_REPO:'

export const getAccountById = async (id: string) => {
  try {
    const account = await AccountModel.findOne({
      id: id,
      isRemove: 0,
    })

    return account
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw new ErrorException(StatusCodes.BAD_REQUEST, error)
  }
}

export const getAccountProfileById = async (id: string) => {
  try {
    const account = await AccountModel.findOne(
      {
        id: id,
        isRemove: 0,
      },
      {
        password: 0,
        source: 0,
        isRemove: 0,
      },
    )

    return account
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw new ErrorException(StatusCodes.BAD_REQUEST, error)
  }
}

export const getAccountByEmail = async (email: string) => {
  try {
    const account = await AccountModel.findOne({
      email: email,
      isRemove: 0,
    })

    return account
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw new ErrorException(StatusCodes.BAD_REQUEST, error)
  }
}

export const updateAccountImageUrl = async ({
  accountId,
  image,
}: UpdateAccountImageUrlRepositoryDto) => {
  try {
    const account = await AccountModel.updateOne(
      {
        id: accountId,
      },
      {
        image,
      },
    )

    return account
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw error
  }
}
