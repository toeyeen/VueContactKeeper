const User = require('../models/User')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    let errors = validationResult(req)

    if (!errors.isEmpty()) {
      let err = []
      errors.array().filter((error) => {
        err.push(error.msg)
      })
      return res.status(400).json({ error: err })
    }

    let user = await User.findOne({
      email,
    })

    if (user) {
      return res.status(400).json({
        success: false,
        message: `The User already exist`,
      })
    }

    user = await User.create({
      name: name,
      email: email,
      password: password,
    })

    let payload = {
      user: {
        id: user._id,
      },
    }

    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
      console.log(err)

      res.status(200).json({ success: true, token: token })
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Server Error',
    })
  }

  // res.status(200).json({
  //   success: true,
  //   body: user,
  // })
}

exports.login = async (req, res, next) => {
  let errors = validationResult(req)

  if (!errors.isEmpty()) {
    let err = []
    errors.array().filter((error) => {
      err.push(error.msg)
    })
    return res.status(400).json({ error: err })
  }

  const { email, password } = req.body

  let user = await User.findOne({
    email: email,
  })

  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'Invalid Credentials',
    })
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: 'Invalid Credentials',
    })
  }

  let payload = {
    user: {
      id: user._id,
    },
  }

  try {
    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
      console.log(err)

      res.status(200).json({ success: true, token: token })
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    })
  }
}

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password')

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: 'Server Errror',
    })
  }
}

// console.log(password)

//     const isMatch = await bcrypt.compare(password, user.password)

//     if (!isMatch) {
//       return res.status(400).json({
//         success: false,
//         msg: 'Invalid Credntials',
//       })
//     }

//     let payload = {
//       user: {
//         id: user._id,
//       },
//     }

//     jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
//       console.log(err)

//       res.status(200).json({ success: true, token: token })
//     })
//   } catch (error) {
//     console.log(error.message)
//     return res.status(500).json({
//       success: false,
//       message: 'Server Error',
//     })
//   }

// try {
//   const user = await (await User.findById(req.user.id)).isSelected(
//     '-password'
//   )

//   res.json(user)
// } catch (error) {
//   res.status(500).json({
//     success: false,
//     msg: 'Server Errror',
//   })
// }
