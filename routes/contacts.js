const express = require('express')

const router = express.Router()

// @route      GET api/contact
// @register   Get all users contact
// @access     PRIVATE

router.get('/', (req, res) => {
  res.send('Get user contacts')
})

// @route      POST api/contact
// @register   Add new users contact
// @access     PRIVATE

router.post('/', (req, res) => {
  res.send('Add new contact')
})

// @route      PUT api/contact/:id
// @register   Update users contact
// @access     PRIVATE

router.put('/:id', (req, res) => {
  res.send(`Update contact with id of ${req.params.id} `)
})

// @route      DELETE api/contact/:id
// @register   Delete users contact
// @access     PRIVATE

router.delete('/:id', (req, res) => {
  res.send(`Delete contact with id of ${req.params.id} `)
})

module.exports = router
