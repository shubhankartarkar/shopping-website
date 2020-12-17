const express = require('express');
const sql = require("mssql");
const router =  express.Router()
const { config } = require("../../globalConstants")

router.get('/', (req, res) => {
  sql.connect(config, function (err) {
    if (err) {
      res.send(err)
    } else {
      let request = new sql.Request(); 
      request.query(`select productid as id,isnull(productname,'') as name,isnull(productprice,0) as price,
      isnull(productDescription,'') as description,isnull(productImage,'product-image-placeholder.jpg') 
      as image, isnull(categoryId,1) as categoryId from Product`, function (err, recordset) {

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
    console.log(req.body)
    if(!err){
      let { id, name, price, description, categoryId } = req.body

      if(name.length > 0 && price > 0 && description.length > 0){
        let request = new sql.Request()
        request.input('name', sql.NVarChar,name)
        request.input('price', sql.Numeric,price)
        request.input('categoryId', sql.Numeric,categoryId)
        request.input('description', sql.NVarChar,description)

        if(id > 0){
          request.input('productId', sql.Int,id)
          request.query(`update Product set productname = @name , productprice = @price, 
            productDescription = @description , categoryId = @categoryId
            where ProductId = @productId; 
            select * from product where ProductId = @productId`,(err, recordset) => {
            if(!err) res.send(recordset.recordset)
          })

        } else {
          request.query(`Insert into Product(productname, productprice, productDescription,categoryId) 
                                      values(@name , @price, @description, @categoryId);
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