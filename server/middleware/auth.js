const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY } = require('../globalConstants')

function authenticateToken(req, res, next) {
  //const token = authHeader && authHeader.split(' ')[1]
  const token = req.body.token
  if (!Boolean(token)) return res.sendStatus(401)

  jwt.verify(token, JWT_SECRET_KEY , (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

function getTokenDetails(req, res, next) {
  const token = req.query.token
  if (token == 0){
    req.user = { id : 0}
    next()
  } else {
    jwt.verify(token, JWT_SECRET_KEY , (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }

  
}

module.exports =  { authenticateToken, getTokenDetails } 