const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001

app.use(cors())
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({extended: true}))

app.use('/public',express.static(__dirname+'/public'))
app.use('/api/product', require('./routes/products/'))
app.use('/api/category', require('./routes/categories/'))
app.use('/api/tablenames', require('./routes/tablenames/'))
app.use('/api/customer', require('./routes/customer/'))
app.use('/api/upload', require('./routes/upload'))
app.use('/api/cart', require('./routes/cart'))
app.use('/api/order', require('./routes/orders'))

app.listen(port, () => console.log(`listening on port ${port}`))