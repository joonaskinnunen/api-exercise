const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const listingRouter = require('./controllers/listings')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
require('dotenv').config()

console.log('connecting to', process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/listings', listingRouter)
app.use('/api/login', loginRouter)

module.exports = app