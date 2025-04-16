import HttpException from './HttpException'

class ErrorException extends HttpException {
  constructor(status: number, data: any) {
    if (data instanceof TypeError) {
      super(status, data.message)
    } else {
      super(status, data.message)
    }
  }
}

export default ErrorException
