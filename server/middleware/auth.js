const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  // Get Token from the header
  const token = req.header('x-auth-token')

  // Check if no token

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token, authorization denied',
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decoded.user

    next()
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token is not valid',
    })
  }
}
