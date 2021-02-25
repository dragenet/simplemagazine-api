import jwt from 'jsonwebtoken'

import { RefreshTokenAdapter } from '@/adapters'
import { clearTokenCookie, token_types } from '@/helpers'
import { httpStatus, responses } from '@/utils'

export const logoutUser = (req, res) => {
  clearTokenCookie(res, token_types.access)
  clearTokenCookie(res, token_types.refresh)
  RefreshTokenAdapter.invalidateToken(jwt.decode(req.cookies.refresh_token))

  res.status(httpStatus.ok).json(responses.userLoggedoutSuccessfuly)
}
