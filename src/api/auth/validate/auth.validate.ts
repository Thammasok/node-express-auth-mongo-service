import Joi from 'joi'

export const signupValidate = {
  display_name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().max(80).required(),
  password: Joi.string()
    .min(8)
    .max(32)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
    .messages({
      'string.pattern.base':
        'Must contain 8 characters one uppercase one lowercase one number and one special case character',
    })
    .required(),
}

export const loginValidate = {
  email: Joi.string().required(),
  password: Joi.string().required(),
}

export const verifyMailValidate = {
  accountId: Joi.string().required(),
  token: Joi.string().required(),
}

export const resendMailVerifyValidate = {
  email: Joi.string().required(),
}

export const otpForMailValidate = {
  email: Joi.string().required(),
}

export const verifyOtpMailValidate = {
  email: Joi.string().required(),
  ref: Joi.string().required(),
  otp: Joi.string().required(),
}

export const refreshTokenValidate = {
  refreshToken: Joi.string().required(),
}

export const forgotMailPasswordValidate = {
  email: Joi.string().required(),
}

export const createNewPasswordValidate = {
  token: Joi.string().required(),
  password: Joi.string().min(8).max(64).required(),
}
