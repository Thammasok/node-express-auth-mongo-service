import config from '@/config'
import logger from '@/boot/logger'
import sgMail, { MailDataRequired, ResponseError } from '@sendgrid/mail'

const LOGGER_NAME = 'MAIL_LIBS:'

sgMail.setApiKey(config.MAIL.SENDGRID_API_KEY)

export type MailDataRequiredDto = MailDataRequired

export const sendMail = async (
  contact: MailDataRequired | MailDataRequired[],
  isMultiple?: boolean,
): Promise<string> => {
  try {
    await sgMail.send(contact, isMultiple)
    
    return 'send mail success'
  } catch (error: ResponseError | unknown) {
    logger.error(LOGGER_NAME, error)

    throw error
  }
}
