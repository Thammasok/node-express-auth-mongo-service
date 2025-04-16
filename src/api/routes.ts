import authRouters from '@/api/auth/auth.routes'
import authSessionRouters from '@/api/auth-session/auth-session.routes'
import accountRouters from '@/api/account/account.route'
import healthRouters from '@/api/health/health.routes'

// Routes
export default [
  healthRouters,
  authRouters,
  authSessionRouters,
  accountRouters,
]
