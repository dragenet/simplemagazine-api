import { token_types } from '../../helpers/token'
import { clearTokenCookie } from '../../helpers/tokenCookies'
import httpStat from '../../helpers/httpStatus'

export const logoutUser = (req, res) => {
  clearTokenCookie(res, token_types.access)
  clearTokenCookie(res, token_types.refresh)
  const successful = {
    message: 'User logged out successfuly',
  }
  res.status(httpStat.ok).json(successful)
}
