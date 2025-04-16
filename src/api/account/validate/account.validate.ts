import Joi from 'joi'

export const updateAccountImageValidate = {
  image: Joi.string().required(),
}
