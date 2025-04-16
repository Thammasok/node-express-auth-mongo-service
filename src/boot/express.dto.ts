import { Request } from 'express'
import { AccountDto } from '@/api/account/account.dto'

interface RequestWithAccount extends Request {
  account: AccountDto
  file?: Express.Multer.File
}

export default RequestWithAccount
