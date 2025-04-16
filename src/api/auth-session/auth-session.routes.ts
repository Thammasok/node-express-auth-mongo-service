import * as AuthSessionController from '@/api/auth-session/controller/auth-session.controller'
// import * as AuthSessionSchema from '@/api/auth-session/validate/auth-session.validate'
import { RouteTypes } from '@/api/routes.dto'

const authSessionRouters: RouteTypes = {
  version: '1',
  path: 'auth-session',
  routers: [
    {
      route: '/',
      method: 'get',
      auth: true,
      handler: AuthSessionController.getSessionLists,
    },
    {
      route: '/deactivate/:id',
      method: 'delete',
      auth: true,
      handler: AuthSessionController.deactivateAuthSession,
    },
  ],
}

export default authSessionRouters
