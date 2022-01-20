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
  const bookings = await Listing.find({}).populate('user')
  response.json(notes.map(note => note.toJSON()))
})

listingRouter.post('/', async (request, response) => {
  const body = request.body

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const listing = new Listing({
    dates: body.dates,
    user: user._id
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

listingRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const listingToDelete = await Listing.findById(id)
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!listingToDelete) {
      return res.status(400).json({ error: 'no poll found with the id ' + id })
    }
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'missing or invalid token' })
    } else if (listingToDelete.user.toString() !== decodedToken.id) {
      return res.status(401).json({ error: `not authorized decodedToken: ${decodedToken}, polltodeleteuser: ${pollToDelete.user.id.toString()}` })
    } else {
      const deletedListing = await Listing.findByIdAndRemove(id)
      res.json(deletedListing.toJSON())
    }

  } catch (exception) {
    next(exception)
  }
})

module.exports = listingRouter