export const refreshTokens = (req, res) => {
  const backReferer = req.cookies.back_referer || '/'

  res.clearCookie('refresh_token')

  res.clearCookie('back_referer')
  res.redirect(307, backReferer)
}
