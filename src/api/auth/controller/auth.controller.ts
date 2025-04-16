import { Response, Request, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { getIPAddress, getIPLocation } from '@/utils/ip-address'
import RequestWithAccount from '@/boot/express.dto'
import ErrorException from '@/exceptions/ErrorException'
import * as AuthRepository from '@/api/auth/repositories/auth.repository'
import * as AuthService from '@/api/auth/services/auth.service'
import * as AuthSessionService from '@/api/auth-session/services/auth-session.service'
import * as AuthSessionRepository from '@/api/auth-session/repositories/auth-session.repository'

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body

    const account = await AuthService.createNewAccount(body)

    if (account) {
      await AuthService.getVerifyLink({
        accountId: account.id,
        email: body.email,
        displayName: body.displayName,
      })

      return res.status(StatusCodes.CREATED).json({
        message: 'Account created successfully',
      })
    }

    throw new ErrorException(
      StatusCodes.BAD_REQUEST,
      'Something went wrong, cannot create account',
    )
  } catch (error) {
    next(error)
  }
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body
    const logged = await AuthService.login(body)

    if (logged) {
      // IP Address
      const ipAddress = await getIPAddress(req)
      if (ipAddress) {
        const ipInfo = await getIPLocation(ipAddress)

        await AuthSessionService.createAuthSession({
          accountId: logged.account.id,
          deviceId: req.headers['x-device-id'] as string,
          ipAddress: ipAddress as string,
          userAgent: req.useragent,
          ipInfo,
        })
      }

      return res.status(StatusCodes.OK).json({
        token: logged.token,
        account: {
          displayName: logged.account.displayName,
          email: logged.account.email,
          image: logged.account.image,
          isVerify: logged.account.isVerify,
        },
      })
    }
  } catch (error) {
    next(error)
  }
}

export const logout = async (
  req: RequestWithAccount,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deviceId = req.headers['x-device-id']
    const account = req.account

    await AuthSessionRepository.deactivateAuthSessionByAccountIdAndDeviceId({
      accountId: account.id,
      deviceId: deviceId as string,
    })

    return res.status(StatusCodes.OK).json({
      message: 'Logout success',
    })
  } catch (error) {
    next(error)
  }
}

export const resendMailVerify = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body
    const account = await AuthRepository.getAccountByEmail(body.email)

    if (account) {
      await AuthService.getVerifyLink({
        accountId: account.id,
        email: body.email,
        displayName: account.displayName,
      })
    }

    return res.status(StatusCodes.OK).json({
      message: 'Send mail for verify success',
    })
  } catch (error) {
    next(error)
  }
}

export const verifyMail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body

    const account = await AuthRepository.getAccountById(body.accountId)

    if (account && account.isVerify) {
      return res.status(StatusCodes.OK).json({
        message: 'Account already verify',
      })
    }

    const result = await AuthService.verifyMail({
      accountId: body.accountId,
      token: body.token,
    })

    return res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}

export const otpForMail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body

    const sended = await AuthService.getOtpForMail(body.email)

    if (sended) {
      return res.status(StatusCodes.OK).json(sended)
    }
  } catch (error) {
    next(error)
  }
}

export const otpVerify = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body

    const account = await AuthRepository.getAccountByEmail(body.email)

    if (account) {
      const result = await AuthService.mailVerifyCode({
        accountId: account.id,
        otp: body.otp,
        ref: body.ref,
      })

      return res.status(StatusCodes.OK).json(result)
    }

    throw new ErrorException(StatusCodes.BAD_REQUEST, 'Email or otp is invalid')
  } catch (error) {
    next(error)
  }
}

export const refreshToken = async (
  req: RequestWithAccount,
  res: Response,
  next: NextFunction,
) => {
  try {
    const account = req.account
    if (account) {
      const token = await AuthService.newToken(account.id)

      return res.status(StatusCodes.OK).json({
        token: token,
        account: {
          displayName: account.displayName,
          email: account.email,
          image: account.image,
          isVerify: account.isVerify,
        },
      })
    }

    throw new TypeError('Something went wrong, cannot create new token')
  } catch (error) {
    next(error)
  }
}

export const forgotMailPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body
    const account = await AuthRepository.getAccountByEmail(body.email)

    if (account) {
      await AuthService.getRequestResetPassword({
        accountId: account.id,
        email: account.email,
      })
    }

    return res.status(StatusCodes.OK).json({
      message: 'Send mail for request change password success',
    })
  } catch (error) {
    next(error)
  }
}

export const createNewPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body

    const passwordSaved = await AuthService.createNewPassword(body)

    return res.status(StatusCodes.OK).json({
      ...passwordSaved,
    })
  } catch (error) {
    next(error)
  }
}
