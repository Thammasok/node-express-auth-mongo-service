import { Model, model, Schema } from 'mongoose'
import { BaseModel, DocumentModel } from '@/libs/db/base.model'

interface IAccountForgotPassword extends BaseModel {
  accountId: string
  token: string
  expiredAt: Date
}

export interface IAccountForgotPasswordDocument
  extends Omit<IAccountForgotPassword, '_id' | 'createdAt' | 'updatedAt'>,
    DocumentModel {}

const accountForgotPasswordModelSchema =
  new Schema<IAccountForgotPasswordDocument>(
    {
      accountId: { type: String, required: true },
      token: { type: String, required: true },
      expiredAt: { type: Date, required: true },
    },
    {
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    },
  )

export const AccountForgotPasswordModel: Model<IAccountForgotPasswordDocument> =
  model<IAccountForgotPasswordDocument>(
    'account_forgot_password',
    accountForgotPasswordModelSchema,
  )
