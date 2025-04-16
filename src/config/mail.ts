const mailConfig = {
  MAIL: {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || '',
    MAIL_DEFAULT_FROM_EMAIL:
      process.env.MAIL_DEFAULT_FROM_EMAIL || 'postmaster@dvith.com',
    MAIL_DEFAULT_FROM_NANE: process.env.MAIL_DEFAULT_FROM_NANE || 'No Reply',
    OTP_EXPIRE_TIME: 10,
    MAIL_VERIFY_URL: process.env.MAIL_VERIFY_URL || '',
  },
}

export default mailConfig
