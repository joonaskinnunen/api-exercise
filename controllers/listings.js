const listingRouter = require('express').Router()
const Listing = require('../models/listing')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

listingRouter.get('/', async (request, response) => {
  const listings = await Listing.find({}).populate('user', ['name', 'phone', 'email'])
  response.json(listings.map(listing => listing.toJSON()))
})

listingRouter.post('/', async (request, response) => {
  const body = request.body

  const token = getTokenFrom(request)
  if (token == null) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  var utcDateStr = new Date().toJSON().slice(0,10).replace(/-/g,'')

  const listing = new Listing({
    title: body.title,
    description: body.description,
    category: body.category,
    location: body.location,
    images: body.images,
    price: body.price,
    date: utcDateStr,
    deliverytype: body.deliverytype,
    user: user.id
  })

  const savedListing = await listing.save()
  user.listings = user.listings.concat(savedListing._id)
  await user.save()
  response.json(savedListing.toJSON())
})

listingRouter.get('/:id', async (request, response) => {
  const listing = await Listing.findById(request.params.id)
  if (listing) {
    response.json(listing.toJSON())
  } else {
    response.status(404).end()
  }
})

listingRouter.get('/category/:category', async (request, response) => {
  const listings = await Listing.find({category: request.params.category}).populate('user', ['name', 'phone', 'email'])
  if (listings) {
    response.json(listings.map(listing => listing.toJSON()))
  } else {
    response.status(404).end()
  }
})

listingRouter.get('/location/:location', async (request, response) => {
  const listings = await Listing.find({location: request.params.location}).populate('user', ['name', 'phone', 'email'])
  if (listings) {
    response.json(listings.map(listing => listing.toJSON()))
  } else {
    response.status(404).end()
  }
})

listingRouter.get('/date/:date', async (request, response) => {
  console.log(request.params.date)
  const listings = await Listing.find({date: request.params.date}).populate('user', ['name', 'phone', 'email'])

  if (listings) {
    response.json(listings.map(listing => listing.toJSON()))
  } else {
    response.status(404).end()
  }
})

listingRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body
  try {
    const listingToUpdate = await Listing.findById(id)
    console.log(listingToUpdate)
    if (!listingToUpdate) {
      return response.status(400).json({ error: 'no listing found with the id ' + id })
    }
    const token = getTokenFrom(request)
    if (token == null) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'missing or invalid token' })
    } else if (listingToUpdate.user.toString() !== decodedToken.id) {
      return response.status(401).json({ error: 'not authorized' })
    } else {
      if(body.title) {
        listingToUpdate.title = body.title
      }
      if(body.description) {
        listingToUpdate.description = body.description
      }
      if(body.category) {
        listingToUpdate.category = body.category
      }
      if(body.location) {
        listingToUpdate.location = body.location
      }
      if(body.images) {
        listingToUpdate.images = body.images
      }
      if(body.price) {
        listingToUpdate.price = body.price
      }
      if(body.deliverytype) {
        listingToUpdate.deliverytype = body.deliverytype
      }
      console.log("listingToUpdate: ")
      console.log(listingToUpdate)
      console.log("savedListing: ")
      const savedListing = await listingToUpdate.save()
      console.log(savedListing)
      response.json(savedListing.toJSON())

    }

  } catch (exception) {
    console.log(exception)
    return response.status(400).json({ error: 'bad request' })
  }
})

listingRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  try {
    const listingToDelete = await Listing.findById(id)
    const token = getTokenFrom(request)
    if (token == null) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!listingToDelete) {
      return response.status(400).json({ error: 'no listing found with the id ' + id })
    }
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'missing or invalid token' })
    } else if (listingToDelete.user.toString() !== decodedToken.id) {
      return response.status(401).json({ error: 'not authorized' })
    } else {
      const deletedListing = await Listing.findByIdAndRemove(id)
      response.json(deletedListing.toJSON())
    }

  } catch (exception) {
    return response.status(400).json({ error: 'bad request' })
  }
})

module.exports = listingRouter