const router = require('express').Router()
const bcrypt = require('bcrypt')
const { tokenExtractor } = require('../middlewares/tokenExtractor')

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  const { username, name, password } = req.body

  const saltRounds = 10
  const passwordhash = await bcrypt.hash(password, saltRounds)

  const newUser = User.build({ username, name, passwordhash: passwordhash})
  await newUser.save()
  //const user = await User.create( { username: username, name:name, passwordhash: passwordhash } )
  //res.json(user)
  res.json(newUser)
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

// set new username for loggen in user
router.put('/:username', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  //const user = await User.findByPk(req.params.id)
  //const username = req.params.username
  if (user) {
    user.username = req.params.username
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router