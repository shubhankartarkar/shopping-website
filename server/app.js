const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001

app.use(cors())
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use('/public',express.static(__dirname+'/public'))

//app.use('/api/auth', require('./routes/auth/index'))
app.use('/api/product', require('./routes/products/'))

app.listen(port, () => console.log(`listening on port ${port}`))