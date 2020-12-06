const express = require('express');
const sql = require("mssql");
const router =  express.Router()

// const config = {
//   server: 'user-PC',
//   database: 'ecommerce',
//   driver: "msnodesqlv8",
//   options: {
//     trustedConnection: true
//   }
// };

// var config = {
//   driver: 'msnodesqlv8',
//   connectionString: 'Driver=SQL Server;Server=user-PC\\MSSQLSERVER;Database=ecommerce;Trusted_Connection=true;'
// };

var config = {
  user: 'testing',
  password: 'test',
  server: 'user-PC', 
  database: 'ecommerce',
  options:{
    enableArithAbort:true
  }
};


router.get('/', (req, res) => {
  sql.connect(config, function (err) {
    if (err) {
      res.send(err)
    } else {
      let request = new sql.Request();
      request.query(`select productid as id,productname as name,productprice as price,
      productDescription as description,isnull(productImage,'product-image-placeholder.jpg') as image from Product`, function (err, recordset) {

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