const mongoose = require('mongoose')

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    images: [],
/*    images: {
        type: Array,
        minlength: 1,
        maxlength: 4,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    deliveryType: {
        type: String,
        enum: ['shipping', 'pickup'],
        required : true 
    }, */
    price: {
        type: Number,
        require: true,     
    },
    date: {
        type: Date
    },
    deliverytype: {
        type: String,
        enum: ['shipping, pickup']
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  })
  
  listingSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  module.exports = mongoose.model('Listing', listingSchema)