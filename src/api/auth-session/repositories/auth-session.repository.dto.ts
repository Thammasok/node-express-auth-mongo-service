import { Details } from 'express-useragent'
import { IPLocation } from '@/utils/ip-address'

export type CreateAuthSessionRepositoryDto = {
  accountId: string
  deviceId: string | null
  ipAddress: string | null
  userAgent: Details | undefined
  ipInfo: IPLocation
}

export type UpdateAuthSessionRepositoryDto = {
  id: string
  ipAddress: string | null
  userAgent: Details | undefined
  ipInfo: IPLocation
}

export type GetAuthSessionsByAccountIdRepositoryDto = {
  accountId: string
  page: number
  limit: number
}
