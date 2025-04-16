import accountConfig from './account'
import appConfig from './app'
import jwtConfig from './jwt'
import mailConfig from './mail'
import passwordConfig from './password'
import authConfig from './auth'

const config = {
  ...appConfig,
  ...jwtConfig,
  ...mailConfig,
  ...passwordConfig,
  ...accountConfig,
  ...authConfig,
}

export default config
