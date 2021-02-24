export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  console.error(err)
  res.status(err.httpStatus || 500)
  res.json({
    errorCode: (err.code || 0x00).toString(16),
    message: err.code ? err.message : 'Unknow error',
  })
}
