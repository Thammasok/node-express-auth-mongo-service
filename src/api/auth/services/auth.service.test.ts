import otpGenerator from 'otp-generator'
import * as jwt from '@/libs/jwt'
import * as AuthService from './auth.service'

describe('Auth Service > Get Token', () => {
  beforeAll(() => {
    jest.mock('@/libs/jwt')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should get token is correct', async () => {
    // Arrange
    const accountId = '01913250-0db7-72a2-a533-e8282e5a3a26'

    // Spy
    jest.spyOn(jwt, 'signAsync').mockResolvedValue('token')

    // Act
    const actual = await AuthService.newToken(accountId)

    // Assert
    expect(actual).toHaveProperty('accessToken')
    expect(actual).toHaveProperty('refreshToken')
  })

  it('should getToken return the correct token', async () => {
    // Arrange
    const accountId = '01913250-0db7-72a2-a533-e8282e5a3a26'
    const expected = {
      accessToken: 'token',
      refreshToken: 'token',
    }

    // Spy
    jest.spyOn(jwt, 'signAsync').mockResolvedValue('token')

    // Act
    const actual = await AuthService.newToken(accountId)

    // Assert
    expect(actual).toEqual(expected)
  })

  it('should signAsync is called 2 Time', async () => {
    // Arrange
    const accountId = '01913250-0db7-72a2-a533-e8282e5a3a26'

    // Spy
    const jwtSpy = jest.spyOn(jwt, 'signAsync').mockResolvedValue('token')

    // Act
    await AuthService.newToken(accountId)

    // Assert
    expect(jwtSpy).toHaveBeenCalledTimes(2)
  })
})

describe('Auth Service > Generate OTP', () => {
  beforeAll(() => {
    jest.mock('otp-generator')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should generate OTP have 2 property', () => {
    // Act
    const actual = AuthService.getNewOTP()

    // Assert
    expect(actual).toHaveProperty('otp')
    expect(actual).toHaveProperty('ref')
  })

  it('should generate OTP can return the correct value', () => {
    const expected = {
      otp: '123456',
      ref: 'ABzxWY',
    }

    // Spy
    jest
      .spyOn(otpGenerator, 'generate')
      .mockReturnValueOnce('123456')
      .mockReturnValue('ABzxWY')

    // Act
    const actual = AuthService.getNewOTP()

    // Assert
    expect(actual).toEqual(expected)
  })

  it('should otp-generator called 2 time', () => {
    // Spy
    const otpSpy = jest
      .spyOn(otpGenerator, 'generate')
      .mockReturnValueOnce('123456')
      .mockReturnValue('ABzxWY')

    // Act
    AuthService.getNewOTP()

    // Assert
    expect(otpSpy).toHaveBeenCalledTimes(2)
  })
})
