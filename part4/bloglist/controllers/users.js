const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

let users = [
]

usersRouter.get('/', async (request, response) => {
  if (users) {
    const users = await User
      .find({}).populate('blogs', { title: 1, author: 1, _url: 1, likes: 1 })
    response.json(users)
  } else {
    response.status(404).end()
  }
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!password) {
    return response.status(400).json({
      error: 'The password is missing'
    })
  } else if (password.length < 3) {
    return response.status(400).json({
      error: 'The password\'s length has to be more than 3 characters'
    })
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
  }
})

module.exports = usersRouter