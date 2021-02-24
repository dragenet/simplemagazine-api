import { clearTokenCookie, token_types } from '@/helpers'
import { httpStatus } from '@/utils'

export const logoutUser = (req, res) => {
  clearTokenCookie(res, token_types.access)
  clearTokenCookie(res, token_types.refresh)
  const successful = {
    message: 'User logged out successfuly',
  }
  res.status(httpStatus.ok).json(successful)
}
