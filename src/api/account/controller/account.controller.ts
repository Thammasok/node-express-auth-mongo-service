import { Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as AccountRepository from '@/api/account/repositories/account.repository'
import RequestWithAccount from '@/boot/express.dto'

export const getAccountProfile = async (
  req: RequestWithAccount,
  res: Response,
  next: NextFunction,
) => {
  try {
    const account = req.account
    const { filter = 'none' } = req.query

    if (account) {
      const accountInfo = await AccountRepository.getAccountProfileById(
        account._id,
      )

      let accountFilter = {}
      if (filter === 'session') {
        accountFilter = {
          displayName: account.displayName,
          email: account.email,
          image: account.image,
          isVerify: account.isVerify,
        }
      } else {
        accountFilter = {
          ...accountInfo,
        }
      }

      return res.status(StatusCodes.OK).json(accountFilter)
    }
  } catch (error) {
    next(error)
  }
}

export const updateAccountImageUrl = async (
  req: RequestWithAccount,
  res: Response,
  next: NextFunction,
) => {
  try {
    const account = req.account
    const body = req.body

    if (account) {
      const updated = await AccountRepository.updateAccountImageUrl({
        accountId: account._id,
        image: body.image,
      })

      if (updated) {
        return res.status(StatusCodes.OK).json({
          message: 'Update account profile success',
        })
      }
    }

    throw new TypeError('Cannot update account')
  } catch (error) {
    next(error)
  }
}
