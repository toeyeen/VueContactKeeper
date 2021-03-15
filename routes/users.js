const express = require('express')

const router = express.Router()

// @route      POST
// @register   Register a user
// @access     PUBLIC

router.post('/', async (req, res) => {
  // res.send('Register user')
  console.log(req)

  res.status(200).json({
    success: true,
    data: 'New user added',
  })
})

module.exports = router
