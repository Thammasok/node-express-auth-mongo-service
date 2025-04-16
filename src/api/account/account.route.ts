import { RouteTypes } from '../routes.dto'
import * as AccountController from '@/api/account/controller/account.controller'
import * as AccountSchema from '@/api/account/validate/account.validate'

const accountRouters: RouteTypes = {
  version: '1',
  path: 'account',
  routers: [
    {
      route: '/',
      method: 'get',
      auth: true,
      handler: AccountController.getAccountProfile,
    },
    {
      route: '/image',
      method: 'post',
      auth: true,
      validate: {
        type: 'body',
        schema: AccountSchema.updateAccountImageValidate,
      },
      handler: AccountController.updateAccountImageUrl,
    },
  ],
}

export default accountRouters
