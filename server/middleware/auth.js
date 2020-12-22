const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY } = require('../globalConstants')

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, JWT_SECRET_KEY , (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

export { authenticateToken }