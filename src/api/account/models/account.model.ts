import { Model, model, Schema } from 'mongoose'
import { BaseModel, DocumentModel } from '@/libs/db/base.model'

interface IAccount extends BaseModel {
  email: string
  displayName: string
  firstName?: string
  lastName?: string
  passwordEnabled: number
  password?: string
  image?: string
  isExternalAccount?: number
  externalProvider?: string
  source?: string
  isVerify: number
  isRemove: number
}

export interface IAccountDocument
  extends Omit<IAccount, '_id' | 'createdAt' | 'updatedAt'>,
    DocumentModel {}

const accountModelSchema = new Schema<IAccountDocument>(
  {
    displayName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    passwordEnabled: { type: Number, default: 0 },
    password: { type: String },
    image: { type: String },
    isExternalAccount: { type: Number, default: 0 },
    externalProvider: { type: String },
    source: { type: String },
    isVerify: { type: Number, default: 0 },
    isRemove: { type: Number, default: 0 },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
)

export const AccountModel: Model<IAccountDocument> = model<IAccountDocument>(
  'account',
  accountModelSchema,
)
