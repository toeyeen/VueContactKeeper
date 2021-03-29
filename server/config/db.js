const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    console.log(
      `Mongo DB connected: ${connect.connection.host}`.cyan.underline.bold
    )
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

module.exports = connectDB
