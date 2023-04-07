const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const Session = require('../models/session')


const sessionValidator = async (req, res, next) => {
  const authorization = req.get('authorization')
  console.log('authorization:', authorization)


  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      console.log(authorization.substring(7))
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
      
    } catch (error){
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }

    try {

      const uSessions = await Session.findOne({
        where: {
          userId: req.decodedToken.id,
          token: authorization.substring(7)
        }
      })

      if(uSessions){
        req.sessionId=uSessions.id
      }else{
        req.decodedToken = null
        console.log('session token not found')
        return res.status(401).json({ error: 'token not found - session invalid - login to continue' })
      }

    } catch (error) {
      console.log(error)
      return res.status(401).json({ error: 'invalid session - login to continue' })            
    }

  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = { sessionValidator }