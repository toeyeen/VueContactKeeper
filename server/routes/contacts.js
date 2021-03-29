const express = require('express')
const auth = require('../middleware/auth')
const advancedResult = require('../middleware/advancedResult')
const Contact = require('../models/Contact')

const {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} = require('../controller/contacts')
const router = express.Router()
const { check } = require('express-validator')

// @route      GET api/contact
// @register   Get all users contact
// @access     PRIVATE

router.get('/', auth, getContacts)

// @route      POST api/contact
// @register   Add new users contact
// @access     PRIVATE

router.post(
  '/',
  [
    check('name', 'Please add a name').not().isEmpty(),
    check('email', 'Please enter a valid email address').isEmail(),
    check('phone', 'Phone Number can not be less than 6 characters').isLength({
      max: 14,
    }),
  ],
  auth,
  createContact
)

// @route      PUT api/contact/:id
// @register   Update users contact
// @access     PRIVATE

router.put(
  '/:id',
  [check('name', 'Please add a name').not().isEmpty()],
  auth,
  updateContact
)

// @route      DELETE api/contact/:id
// @register   Delete users contact
// @access     PRIVATE

router.delete('/:id', auth, deleteContact)

module.exports = router
