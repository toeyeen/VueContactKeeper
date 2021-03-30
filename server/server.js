const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDB = require('./config/db')
const path = require('path')
const serveStatic = require('serve-static')

// Use dot env

dotenv.config({ path: 'server/config/config.env' })

const app = express()

// Connect database
connectDB()

// Init Middleware
app.use(
  express.json({
    extended: false,
  })
)

app.use(function (req, res, next) {
  /*var err = new Error('Not Found');
   err.status = 404;
   next(err);*/

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization, x-auth-token'
  )

  //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Pass to next layer of middleware
  next()
})

const PORT = process.env.ENV_PORT || 5000

// Define route

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

// Set Static Folder
// app.use(express.static('client/dist'))

// app.get('*', (req, res) =>
//   res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
// )

app.use(express.static('../client/dist'))
app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`)
})
