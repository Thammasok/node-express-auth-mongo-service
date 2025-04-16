
import { sendMail, MailDataRequiredDto } from '.'
import sgMail from '@sendgrid/mail'
import logger from '@/boot/logger'

jest.mock('@sendgrid/mail')
jest.mock('@/boot/logger')

describe('Mail Service', () => {
  const mockMailData: MailDataRequiredDto = {
    to: 'test@example.com',
    from: 'sender@example.com',
    subject: 'Test Email',
    text: 'This is a test email'
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should send email successfully', async () => {
    const mockResponse = [
      {
        statusCode: 202,
        headers: {},
        body: {}
      },
      {}
    ]
    
    ;(sgMail.send as jest.Mock).mockResolvedValue(mockResponse)

    const result = await sendMail(mockMailData)
    
    expect(sgMail.send).toHaveBeenCalledWith(mockMailData, undefined)
    expect(result).toBe('send mail success')
  })

  it('should send multiple emails successfully', async () => {
    const mockMultipleMailData: MailDataRequiredDto[] = [
      mockMailData,
      {
        ...mockMailData,
        to: 'test2@example.com'
      }
    ]

    const mockResponse = [
      {
        statusCode: 202,
        headers: {},
        body: {}
      },
      {}
    ]
    
    ;(sgMail.send as jest.Mock).mockResolvedValue(mockResponse)

    const result = await sendMail(mockMultipleMailData, true)
    
    expect(sgMail.send).toHaveBeenCalledWith(mockMultipleMailData, true)
    expect(result).toBe('send mail success')
  })

  it('should handle error when sending email fails', async () => {
    const mockError = new Error('Failed to send email')
    ;(sgMail.send as jest.Mock).mockRejectedValue(mockError)

    await expect(sendMail(mockMailData)).rejects.toThrow(mockError)
    expect(logger.error).toHaveBeenCalledWith('MAIL_LIBS:', mockError)
  })
})
