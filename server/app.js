const express = require('express')
const app = express()
const sql = require("mssql/msnodesqlv8");
const port = process.env.PORT || 3001

// config for your database
var config = {
  server: 'localhost',
  database: 'ecommerce',
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true
  }
};

app.get('/products', (req, res) => {
  sql.connect(config, function (err) {
    if (err) {
      res.send('Some error occured')
    } else {
      var request = new sql.Request();
      request.input('myid',sql.Numeric,'2')
      request.query('select * from customer where Customerid = @myid', function (err, recordset) {

        if (err) {
          res.send(err)
        } else {
          res.json(recordset.recordset);
        }
      });
    }
  })
})

app.listen(port, () => console.log(`listening on port ${port}`))