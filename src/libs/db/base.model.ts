export interface BaseModel {
  _id?: string
  createdAt?: Date
  updatedAt?: Date
}
export interface DocumentModel extends BaseModel {
  _id: string
  createdAt: Date
  updatedAt: Date
}
