const express = require('express')
const { check } = require('express-validator')
const auth = require('../middleware/auth')

const { login, getMe } = require('../controller/users')

const router = express.Router()

// @route      GET api/auth
// @register   Get Logged in user info from the token provided
// @access     PRIVATE

router.get('/', auth, getMe)

// @route      POST api/auth
// @register   Login/Auth user and create token
// @access     PUBLIC

router.post(
  '/',
  [
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 }),
  ],
  login
)

module.exports = router
