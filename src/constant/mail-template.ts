import config from "@/config"

const mailTemplateConstant = {
  VERIFY_EMAIL_WITH_LINK: {
    SUBJECT: `Welcome to ${config.APP_NAME}, please verify your email`,
    TEMPLATE_ID: 'd-bd91d5d56b45412cbd9ebc47e9a474a0',
  },
  VERIFY_MAIL_WITH_OTP: {
    SUBJECT: 'is your verification code',
    TEMPLATE_ID: 'd-451e1d7bdb0c4f3ba0a164c4b70f122e',
  },
  REQUEST_RESET_PASSWORD: {
    SUBJECT: 'Your request to reset password',
    TEMPLATE_ID: 'd-9f173e7b865247eea99be77d0382c472',
  },
}
export default mailTemplateConstant