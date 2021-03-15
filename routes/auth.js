const express = require('express')

const router = express.Router()

// @route      GET api/auth
// @register   Get Logged in user
// @access     PRIVATE

router.get('/', (req, res) => {
  res.send('Get  Logged in user')
})

// @route      POST api/auth
// @register   Auth user and get token
// @access     PUBLIC

router.post('/', (req, res) => {
  res.send('Log in user')
})

module.exports = router
