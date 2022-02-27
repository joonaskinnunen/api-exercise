const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    const username = body.username

    if(!username || !body.name || !body.phone || !body.email|| !body.password) {
      return response.status(400).json({
        error: 'required information missing'
      })
    }

    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return response.status(400).json({
      error: 'username must be unique'
      })
    }

    const saltRounds = 10
    console.log(body)
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      phone: body.phone,
      email: body.email,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

/* usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('listings')
  response.json(users.map(u => u.toJSON()))
})
*/
module.exports = usersRouter