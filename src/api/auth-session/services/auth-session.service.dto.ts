import { Details } from 'express-useragent'
import { IPLocation } from '@/utils/ip-address'

export type CreateAuthSessionServiceDto = {
  accountId: string
  deviceId: string | null
  ipAddress: string | null
  userAgent: Details | undefined
  ipInfo: IPLocation
}
