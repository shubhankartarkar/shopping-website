const express = require('express');
const sql = require("mssql/msnodesqlv8");
const router =  express.Router()

const config = {
  server: 'localhost',
  database: 'ecommerce',
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true
  }
};

router.get('/', (req, res) => {
  sql.connect(config, function (err) {
    if (err) {
      res.send(err)
    } else {
      let request = new sql.Request();
      request.input('myid',sql.Numeric,'2')
      request.query(`select productid as id,name,price,description,isnull(Image,'product-placeholder.png') as image from Product`, function (err, recordset) {

        if (err) {
          res.send(err)
        } else {
          res.json(recordset.recordset);
        }
      });
    }
  })
})

router.post('/', (req, res) => {
  sql.connect(config, (err) => {
    if(!err){
      console.log(req.body)
      let { productId, name, price, description } = req.body

      if(name.length > 0 && price.length > 0 && description.length > 0){
        let request = new sql.Request()
        request.input('name', sql.NVarChar,name)
        request.input('price', sql.Numeric,price)
        request.input('description', sql.NVarChar,description)

        if(productId > 0){
          request.input('productId', sql.Int,productId)
          request.query(`update Product set Name = @name , Price = @price, Description = @description where ProductId = @productId; 
            select * from product where ProductId = @productId`,(err, recordset) => {
            if(!err) res.send(recordset.recordset)
          })

        } else {
          request.query(`Insert into Product(Name, Price, Description) values(@name , @price, @description);
          select * from product where ProductId = SCOPE_IDENTITY()`,(err, recordset) => {
            if(err){
              res.send(err)
            }  else {
              res.send(recordset.recordset)
            }
          })
        }
      }
    }
  })
})


module.exports = router