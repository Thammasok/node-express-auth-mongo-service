import * as AuthController from '@/api/auth/controller/auth.controller'
import * as AuthSchema from '@/api/auth/validate/auth.validate'
import { RouteTypes } from '@/api/routes.dto'

const authRouters: RouteTypes = {
  version: '1',
  path: 'auth',
  routers: [
    {
      route: '/signup',
      method: 'post',
      validate: {
        type: 'body',
        schema: AuthSchema.signupValidate,
      },
      handler: AuthController.signup,
    },
    {
      route: '/login',
      method: 'post',
      validate: {
        type: 'body',
        schema: AuthSchema.loginValidate,
      },
      handler: AuthController.login,
    },
    {
      route: '/logout',
      method: 'post',
      auth: true,
      handler: AuthController.logout,
    },
    {
      route: '/verify/mail',
      method: 'post',
      validate: {
        type: 'body',
        schema: AuthSchema.resendMailVerifyValidate,
      },
      handler: AuthController.resendMailVerify,
    },
    {
      route: '/verify/mail',
      method: 'patch',
      validate: {
        type: 'body',
        schema: AuthSchema.verifyMailValidate,
      },
      handler: AuthController.verifyMail,
    },
    {
      route: '/otp/mail',
      method: 'post',
      validate: {
        type: 'body',
        schema: AuthSchema.otpForMailValidate,
      },
      handler: AuthController.otpForMail,
    },
    {
      route: '/otp/verify',
      method: 'post',
      validate: {
        type: 'body',
        schema: AuthSchema.verifyOtpMailValidate,
      },
      handler: AuthController.otpVerify,
    },
    {
      route: '/refresh',
      method: 'post',
      auth: true,
      useRefreshToken: true,
      handler: AuthController.refreshToken,
    },
    {
      route: '/forgot/mail',
      method: 'post',
      validate: {
        type: 'body',
        schema: AuthSchema.forgotMailPasswordValidate,
      },
      handler: AuthController.forgotMailPassword,
    },
    {
      route: '/password',
      method: 'post',
      validate: {
        type: 'body',
        schema: AuthSchema.createNewPasswordValidate,
      },
      handler: AuthController.createNewPassword,
    }
  ],
}

export default authRouters
