import { Model, model, Schema } from 'mongoose'
import { BaseModel, DocumentModel } from '@/libs/db/base.model'

export enum EAuthSessionStatus {
  ACTIVE = 1,
  DEACTIVATE = 0,
}

interface IAuthSession extends BaseModel {
  accountId: string
  status: number
  deviceId?: string
  ip?: string
  ipInfo?: string
  userAgent?: string
}

export interface IAuthSessionDocument
  extends Omit<IAuthSession, '_id' | 'createdAt' | 'updatedAt'>,
    DocumentModel {}

const authSessionModelSchema = new Schema<IAuthSessionDocument>(
  {
    accountId: { type: String, required: true },
    status: { type: Number, default: EAuthSessionStatus.ACTIVE },
    deviceId: { type: String },
    ip: { type: String },
    ipInfo: { type: String },
    userAgent: { type: String },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
)

export const AuthSessionModel: Model<IAuthSessionDocument> =
  model<IAuthSessionDocument>('auth_session', authSessionModelSchema)
