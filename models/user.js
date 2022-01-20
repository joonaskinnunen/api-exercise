const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    minlength: 5,
    require: true
  },
  phone: {
      type: String,
      minlength: 5,
      require: true
  },
  email: {
      type: String,
      require: true
  },
  passwordHash: String,
  listings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User