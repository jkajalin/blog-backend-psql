const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()

const { SECRET } = require('../util/config')

//const { tokenExtractor } = require('../middlewares/tokenExtractor')
const User = require('../models/user')
const Session = require('../models/session')

// login route
router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  //const passwordCorrect = body.password === 'salainen'
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordhash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)
  console.log(token)

  if(token){
    console.log('user id: ', user.id)
    const newSession = Session.build({ user_id: user.id, token })
    await newSession.save()
  }
  
  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router