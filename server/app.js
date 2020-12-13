const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001

app.use(cors())
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({extended: true}))

// app.use((req, res, next) => {
//   setTimeout(() => next(), 5000);
// });

app.use('/public',express.static(__dirname+'/public'))

//app.use('/api/auth', require('./routes/auth/'))
app.use('/api/product', require('./routes/products/'))
app.use('/api/category', require('./routes/categories/'))
app.use('/api/tablenames', require('./routes/tablenames/'))
app.use('/api/upload', require('./routes/upload'))

app.listen(port, () => console.log(`listening on port ${port}`))