import { StatusCodes } from 'http-status-codes'
import otpGenerator from 'otp-generator'
import moment from 'moment'
import config from '@/config'
import logger from '@/boot/logger'
import * as jwt from '@/libs/jwt'
import * as redis from '@/libs/redis'
import ErrorException from '@/exceptions/ErrorException'
import * as Mail from '@/libs/mail'
import * as AuthRepository from '@/api/auth/repositories/auth.repository'
import * as hash from '@/utils/hash-password'
import {
  CreateNewAccountServiceDto,
  CreateNewPasswordServiceDto,
  GetRequestResetPasswordServiceDto,
  GetVerifyLinkDto,
  LoginServiceDto,
  SendMailForRequestResetPasswordServiceDto,
  SendMailForVerifyCodeServiceDto,
  SendMailForVerifyLinkDto,
  SendVerifyCodeServiceDto,
  VerifyMailServiceDto,
} from '@/api/auth/services/auth.service.dto'
import mailTemplateConstant from '@/constant/mail-template'

const LOGGER_NAME = 'AUTH_SERVICE:'

export const createNewAccount = async ({
  email,
  display_name,
  password,
}: CreateNewAccountServiceDto) => {
  try {
    const hashPassword = await hash.hashPassword(password)

    const account = await AuthRepository.createNewAccount({
      // accountId,
      email,
      display_name,
      password: hashPassword,
    })

    if (!account) {
      throw new ErrorException(StatusCodes.BAD_REQUEST, 'Something went wrong')
    }

    return account
  } catch (error) {
    console.log(error)
    logger.error(LOGGER_NAME, error)

    throw new ErrorException(StatusCodes.BAD_REQUEST, error)
  }
}

export const login = async ({ email, password }: LoginServiceDto) => {
  try {
    const account = await AuthRepository.getAccountByEmail(email)

    if (account) {
      const isMatch = await hash.comparePassword({
        password: password,
        hash: account.password || '',
      })

      if (isMatch) {
        const token = await newToken(account.id)

        return {
          token,
          account,
        }
      }
    }

    throw new TypeError('Email or password invalid')
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw new ErrorException(StatusCodes.BAD_REQUEST, error)
  }
}

export const newToken = async (accountId: string) => {
  try {
    const accessOption = {
      expiresIn: config.JWT.ACCESS_TOKEN_EXPIRES_IN || '1H',
      algorithm: 'HS256',
    } as jwt.JWTSignOptions

    const refreshOption = {
      expiresIn: config.JWT.REFRESH_TOKEN_EXPIRES_IN || '7D',
      algorithm: 'HS256',
    } as jwt.JWTSignOptions

    const accessToken = await jwt.signAsync(
      {
        accountId,
        sub: 'access_token',
      },
      config.JWT.JWT_SECRET,
      accessOption,
    )
    const refreshToken = await jwt.signAsync(
      {
        accountId,
        sub: 'refresh_token',
      },
      config.JWT.JWT_SECRET,
      refreshOption,
    )

    return { accessToken, refreshToken }
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw new ErrorException(StatusCodes.UNAUTHORIZED, error)
  }
}

export const getVerifyLink = async ({
  accountId,
  displayName,
  email,
}: GetVerifyLinkDto) => {
  try {
    const token = newVerifyEmailToken()

    const verifyLinkSaved = await redis.setValue({
      key: accountId,
      value: JSON.stringify({
        token: token,
        expired: moment().add(config.MAIL.OTP_EXPIRE_TIME, 'minutes').utc(),
      }),
    })

    if (verifyLinkSaved) {
      const mail = await sendMailForVerifyLink({
        accountId,
        email,
        displayName,
        token,
      })

      return mail
    } else {
      throw new TypeError('Redis error')
    }
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw new ErrorException(StatusCodes.BAD_REQUEST, error)
  }
}

export const newVerifyEmailToken = () => {
  const token = otpGenerator.generate(64, {
    upperCaseAlphabets: true,
    lowerCaseAlphabets: true,
    specialChars: false,
  })

  return token
}

export const sendMailForVerifyLink = async ({
  accountId,
  displayName,
  email,
  token,
}: SendMailForVerifyLinkDto) => {
  try {
    const data: Mail.MailDataRequiredDto = {
      to: email,
      from: `"${config.MAIL.MAIL_DEFAULT_FROM_NANE}" <${config.MAIL.MAIL_DEFAULT_FROM_EMAIL}>`,
      templateId: mailTemplateConstant.VERIFY_EMAIL_WITH_LINK.TEMPLATE_ID,
      dynamicTemplateData: {
        subject: mailTemplateConstant.VERIFY_EMAIL_WITH_LINK.SUBJECT,
        link: `${config.MAIL.MAIL_VERIFY_URL}?a=${accountId}&t=${token}`,
        displayName,
      },
      // content: [
      //   {
      //     type: 'text/html',
      //     value: '',
      //   },
      // ],
    }

    await Mail.sendMail(data)

    return {
      message: 'Send mail success',
    }
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw error
  }
}

export const verifyMail = async ({
  accountId,
  token,
}: VerifyMailServiceDto) => {
  try {
    const result = await redis.getValue(accountId)

    if (result && result.token === token && moment().isBefore(result.expired)) {
      await AuthRepository.updateVerifyAccount(accountId)

      await redis.deleteValue(accountId)

      return {
        message: 'Verify email success',
      }
    }

    throw new TypeError('Verify email failed')
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw new ErrorException(StatusCodes.BAD_REQUEST, error)
  }
}

/** ---------- OTP ---------- */
export const getOtpForMail = async (email: string) => {
  try {
    const otp = getNewOTP()

    const account = await AuthRepository.getAccountByEmail(email)

    if (account && !account.isVerify) {
      const otpSaved = await redis.setValue({
        key: account.id,
        value: JSON.stringify({
          ...otp,
          expired: moment().add(config.MAIL.OTP_EXPIRE_TIME, 'minutes').utc(),
        }),
      })

      if (otpSaved) {
        const mail = await sendMailForVerifyCode({
          email,
          otp,
        })

        return mail
      } else {
        throw new TypeError('Redis error')
      }
    }

    throw new TypeError('Email not found or email is verified')
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw new ErrorException(StatusCodes.BAD_REQUEST, error)
  }
}

export const mailVerifyCode = async ({
  accountId,
  otp,
  ref,
}: SendVerifyCodeServiceDto) => {
  try {
    const otpData = await redis.getValue(accountId)

    if (otpData && otpData.otp === otp && otpData.ref === ref) {
      if (moment().diff(otpData.expired, 'seconds') < 0) {
        await AuthRepository.updateVerifyAccount(accountId)

        await redis.deleteValue(accountId)

        return {
          message: 'OTP verified',
        }
      } else {
        await redis.deleteValue(accountId)

        return {
          message: 'OTP expired',
        }
      }
    } else {
      throw new TypeError('OTP invalid')
    }
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw new ErrorException(StatusCodes.BAD_REQUEST, error)
  }
}

export const getNewOTP = () => {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  })

  const ref = otpGenerator.generate(6, {
    upperCaseAlphabets: true,
    lowerCaseAlphabets: true,
    specialChars: false,
  })

  return { otp, ref }
}

export const sendMailForVerifyCode = async ({
  email,
  otp,
}: SendMailForVerifyCodeServiceDto) => {
  try {
    const data: Mail.MailDataRequiredDto = {
      to: email,
      from: `"${config.MAIL.MAIL_DEFAULT_FROM_NANE}" <${config.MAIL.MAIL_DEFAULT_FROM_EMAIL}>`,
      templateId: mailTemplateConstant.VERIFY_MAIL_WITH_OTP.TEMPLATE_ID,
      dynamicTemplateData: {
        subject: `[${otp.otp}] ${mailTemplateConstant.VERIFY_MAIL_WITH_OTP.SUBJECT}`,
        email,
        otp,
      },
      // content: [
      //   {
      //     type: 'text/html',
      //     value: '',
      //   },
      // ],
    }

    await Mail.sendMail(data)

    return {
      message: 'Send mail success',
    }
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw error
  }
}
/** ---------- OTP ---------- */

export const getRequestResetPassword = async ({
  accountId,
  email,
}: GetRequestResetPasswordServiceDto) => {
  try {
    const token = newResetToken()

    const expired = moment().add(config.MAIL.OTP_EXPIRE_TIME, 'minutes').utc()

    const requestResetPassword =
      await AuthRepository.updateRequestResetPassword({
        accountId,
        token,
        expired: expired.toDate(),
      })

    if (requestResetPassword) {
      const mail = await sendMailForRequestResetPassword({
        email,
        token,
      })

      return mail
    }

    throw new TypeError('Can not request reset password')
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw new ErrorException(StatusCodes.BAD_REQUEST, error)
  }
}

export const newResetToken = () => {
  const token = otpGenerator.generate(64, {
    upperCaseAlphabets: true,
    lowerCaseAlphabets: true,
    specialChars: false,
  })

  return token
}

export const sendMailForRequestResetPassword = async ({
  email,
  token,
}: SendMailForRequestResetPasswordServiceDto) => {
  try {
    const data: Mail.MailDataRequiredDto = {
      to: email,
      from: `"${config.MAIL.MAIL_DEFAULT_FROM_NANE}" <${config.MAIL.MAIL_DEFAULT_FROM_EMAIL}>`,
      templateId: mailTemplateConstant.REQUEST_RESET_PASSWORD.TEMPLATE_ID,
      dynamicTemplateData: {
        subject: mailTemplateConstant.REQUEST_RESET_PASSWORD.SUBJECT,
        resetUrl: `${config.RESET_PASSWORD.RESET_PASSWORD_URL}?token=${token}`,
      },
      // content: [
      //   {
      //     type: 'text/html',
      //     value: '',
      //   },
      // ],
    }

    await Mail.sendMail(data)

    return {
      message: 'Send mail for request reset success',
    }
  } catch (error) {
    logger.error(LOGGER_NAME, error)

    throw error
  }
}

export const createNewPassword = async ({
  token,
  password,
}: CreateNewPasswordServiceDto) => {
  try {
    const resetToken =
      await AuthRepository.getRequestResetPasswordByToken(token)

    if (resetToken && moment().diff(resetToken.expiredAt, 'seconds') < 0) {
      const hashPassword = await hash.hashPassword(password)

      await AuthRepository.updatePassword(resetToken.accountId, hashPassword)
      await AuthRepository.deleteRequestResetPassword(resetToken.accountId)

      return {
        message: 'Update password success',
      }
    }

    throw new TypeError('Token invalid or expired')
  } catch (error) {
    throw new ErrorException(StatusCodes.BAD_REQUEST, error)
  }
}
