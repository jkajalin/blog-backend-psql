const router = require('express').Router()

const { sessionValidator } = require('../middlewares/sessionValidator')
const Session = require('../models/session')

router.delete('/', sessionValidator, async (req, res) => {
  await Session.destroy({
    where: {
      userId: req.decodedToken.id
    }
  })

  //await uSessions.destroy()
  //req.decodedToken = null

  res.status(204).end()
})

module.exports = router