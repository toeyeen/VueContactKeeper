const express = require('express')
const { check } = require('express-validator')

const { register } = require('../controller/users')

const router = express.Router()

// @route      POST
// @register   Register a user
// @access     PUBLIC

router.post(
  '/',
  [
    check('name', 'Please add a name').not().isEmpty(),
    check('email', 'Please enter a valid email address').isEmail(),
    check('password', 'Password can not be less than 6 characters').isLength({
      min: 6,
    }),
  ],
  register
)

module.exports = router
