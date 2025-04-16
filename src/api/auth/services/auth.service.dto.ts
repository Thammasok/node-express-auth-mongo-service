export type CreateNewAccountServiceDto = {
  display_name: string
  email: string
  password: string
}

export type LoginServiceDto = {
  email: string
  password: string
}

export type SendMailForVerifyCodeServiceDto = {
  email: string
  otp: {
    otp: string
    ref: string
  }
}

export type GetVerifyLinkDto = {
  accountId: string
  email: string
  displayName: string
}

export type SendMailForVerifyLinkDto = {
  accountId: string
  displayName: string
  email: string
  token: string
}

export type SendVerifyCodeServiceDto = {
  accountId: string
  otp: string
  ref: string
}

export type GetRequestResetPasswordServiceDto = {
  accountId: string
  email: string
}

export type SendMailForRequestResetPasswordServiceDto = {
  email: string
  token: string
}

export type CreateNewPasswordServiceDto = {
  token: string
  password: string
}

export type VerifyMailServiceDto = {
  accountId: string
  token: string
}
