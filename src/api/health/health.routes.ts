// import express from 'express'
// const router = express.Router()

// Controllers
import HealthController from '@/api/health/health.controller'
import { RouteTypes } from '../routes.dto'

const authRouters: RouteTypes = {
  version: '1',
  path: 'health',
  routers: [
    {
      route: '/',
      method: 'get',
      handler: HealthController.healthCheck,
    },
  ],
}

export default authRouters
