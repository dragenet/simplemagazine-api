import errors from './errors'

class ControllerError extends Error {
  constructor(error, message, code, httpStatus) {
    let err = errors.default

    if (error && error !== null) {
      err = error
    }

    if (message) err.message = message
    if (code) err.code = code
    if (httpStatus) err.httpStatus = httpStatus

    const msg = err.message || 'Unknow error'
    super(msg)
    this.code = err.code || 0x00
    this.httpStatus = err.httpStatus || 500
  }
}

export default ControllerError
