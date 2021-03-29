const User = require('../models/User')
const Contact = require('../models/Contact')
const { validationResult } = require('express-validator')

exports.getContacts = async (req, res, next) => {
  try {
    console.log(req.user.id)
    // if (req.user.id) {
    //   const contacts = await Course.find({ user: req.user.id })

    //   return res.status(200).json({
    //     success: true,
    //     count: contacts.length,
    //     data: contacts,
    //   })
    // } else {
    //   res.status(200).json(res.advancedResult)
    // }

    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    })
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    })
  } catch (error) {
    res.status(400).json({
      success: true,
      message: 'Server Error',
    })
  }
}

exports.createContact = async (req, res, next) => {
  const { name, email, phone, type } = req.body

  let errors = validationResult(req)

  if (!errors.isEmpty()) {
    let err = []
    errors.array().filter((error) => {
      err.push(error.msg)
    })
    return res.status(400).json({ error: err })
  }

  try {
    const contact = await Contact.create({
      name: name,
      email,
      phone,
      type,
      user: req.user.id,
    })
    res.status(200).json({
      success: true,
      data: contact,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
    })
  }
}

exports.updateContact = async (req, res, next) => {
  let contact = await Contact.findById(req.params.id)

  if (!contact) {
    res.status(500).json({
      success: false,
      message: `The contact with id of ${req.params.id} can not be found`,
    })
  }

  let errors = validationResult(req)

  if (!errors.isEmpty()) {
    let err = []
    errors.array().filter((error) => {
      err.push(error.msg)
    })
    return res.status(400).json({ error: err })
  }

  // Make sure user is course  owner
  if (contact.user.toString() !== req.user.id) {
    return next(
      res.status(401).json({
        success: true,
        message: `User with the id of ${req.user.id} is not autorize to update this contact`,
      })
    )
  }

  course = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: contact,
  })
}

//  @desc     Delete a courses
// @route     DELETE /api/v1/courses/:id
// @access    Private
exports.deleteContact = async (req, res, next) => {
  const contact = await Contact.findById(req.params.id)

  if (!contact) {
    return next(
      res.status(401).json({
        success: false,
        message: `No course with the Id of ${req.params.id}`,
      })
    )
  }

  // Make sure user is course  owner
  if (contact.user.toString() !== req.user.id) {
    return next(
      res.status(401).json({
        success: false,
        message: `User with the id of ${req.user.id} is not autorize to delete this contact`,
      })
    )
  }

  await contact.remove()

  res.status(200).json({
    success: true,
    data: {},
  })
}
