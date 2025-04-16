import { Details } from 'express-useragent'
import { IPLocation } from '@/utils/ip-address'

export type CreateNewAccountRepositoryDto = {
  // accountId: string
  display_name: string
  email: string
  password: string
}

export type CreateSessionRepositoryDto = {
  accountId: string
  deviceId: string | null
  ipAddress: string | null
  userAgent: Details | undefined
  ipInfo: IPLocation
}

export type UpdateRequestResetPasswordRepositoryDto = {
  accountId: string
  token: string
  expired: Date
}
