const express = require('express')
const dotenv = require('dotenv')

const app = express()

const PORT = process.env.ENV_PORT || 5000

// Define route

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`)
})
