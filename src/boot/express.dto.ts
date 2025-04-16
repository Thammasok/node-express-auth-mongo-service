import { Request } from 'express'
import { IAccountDocument } from '@/api/account/models/account.model'

interface RequestWithAccount extends Request {
  account: IAccountDocument
  file?: Express.Multer.File
}

export default RequestWithAccount
