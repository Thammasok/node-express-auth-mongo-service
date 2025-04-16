
import Joi from 'joi'
import {
  signupValidate,
  loginValidate,
  verifyMailValidate,
  resendMailVerifyValidate,
  otpForMailValidate,
  verifyOtpMailValidate,
  refreshTokenValidate,
  forgotMailPasswordValidate,
  createNewPasswordValidate,
} from './auth.validate'

describe('Auth Schema Validation', () => {
  describe('signupSchema', () => {
    it('should validate correct signup data', () => {
      const schema = Joi.object(signupValidate)
      const validData = {
        display_name: 'John Doe',
        email: 'john@example.com',
        password: 'Test123!@#',
      }
      const { error } = schema.validate(validData)
      expect(error).toBeUndefined()
    })

    it('should fail with invalid password format', () => {
      const schema = Joi.object(signupValidate)
      const invalidData = {
        display_name: 'John Doe',
        email: 'john@example.com',
        password: 'weakpass',
      }
      const { error } = schema.validate(invalidData)
      expect(error).toBeDefined()
    })
  })

  describe('loginSchema', () => {
    it('should validate correct login data', () => {
      const schema = Joi.object(loginValidate)
      const validData = {
        email: 'test@example.com',
        password: 'password123',
      }
      const { error } = schema.validate(validData)
      expect(error).toBeUndefined()
    })
  })

  describe('verifyMailSchema', () => {
    it('should validate correct verify mail data', () => {
      const schema = Joi.object(verifyMailValidate)
      const validData = {
        accountId: '123456',
        token: 'valid-token',
      }
      const { error } = schema.validate(validData)
      expect(error).toBeUndefined()
    })
  })

  describe('resendMailVerifySchema', () => {
    it('should validate correct resend mail data', () => {
      const schema = Joi.object(resendMailVerifyValidate)
      const validData = {
        email: 'test@example.com',
      }
      const { error } = schema.validate(validData)
      expect(error).toBeUndefined()
    })
  })

  describe('otpForMailSchema', () => {
    it('should validate correct otp request data', () => {
      const schema = Joi.object(otpForMailValidate)
      const validData = {
        email: 'test@example.com',
      }
      const { error } = schema.validate(validData)
      expect(error).toBeUndefined()
    })
  })

  describe('verifyOtpMailSchema', () => {
    it('should validate correct otp verification data', () => {
      const schema = Joi.object(verifyOtpMailValidate)
      const validData = {
        email: 'test@example.com',
        ref: 'reference123',
        otp: '123456',
      }
      const { error } = schema.validate(validData)
      expect(error).toBeUndefined()
    })
  })

  describe('refreshTokenSchema', () => {
    it('should validate correct refresh token data', () => {
      const schema = Joi.object(refreshTokenValidate)
      const validData = {
        refreshToken: 'valid-refresh-token',
      }
      const { error } = schema.validate(validData)
      expect(error).toBeUndefined()
    })
  })

  describe('forgotMailPasswordSchema', () => {
    it('should validate correct forgot password request', () => {
      const schema = Joi.object(forgotMailPasswordValidate)
      const validData = {
        email: 'test@example.com',
      }
      const { error } = schema.validate(validData)
      expect(error).toBeUndefined()
    })
  })

  describe('createNewPasswordSchema', () => {
    it('should validate correct new password data', () => {
      const schema = Joi.object(createNewPasswordValidate)
      const validData = {
        token: 'valid-token',
        password: 'newPassword123',
      }
      const { error } = schema.validate(validData)
      expect(error).toBeUndefined()
    })
  })
})
