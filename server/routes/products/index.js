const express = require('express');
const sql = require("mssql");
const router =  express.Router()
const { config } = require("../../globalConstants")
const { getTokenDetails } = require("../../middleware/auth")

//GET Returns all Products
router.get('/', (req, res) => {
  sql.connect(config, function (err) {
    if (err) {
      res.send(err)
    } else {
      let request = new sql.Request(); 
      request.query(`select p.productid as id,isnull(p.productname,'') as name,isnull(p.productprice,0) as price,
      isnull(p.productDescription,'') as description,isnull(p.productImage,'product-image-placeholder.jpg') 
      as image, isnull(p.categoryId,1) as categoryId, isnull(c.categoryName,'No Category Added') as categoryName
      from Product p
      left outer join Category c on c.categoryId = p.categoryId
      `, function (err, recordset) {

        if (err) {
          res.send(err)
        } else {
          res.json(recordset.recordset);
        }
      });
    }
  })
})


//POST Manages Insert and Update of Single Product based on data passed
router.post('/', (req, res) => {
  sql.connect(config, (err) => {
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
            
            select p.productid as id,isnull(p.productname,'') as name,isnull(p.productprice,0) as price,
            isnull(p.productDescription,'') as description,isnull(p.productImage,'product-image-placeholder.jpg') 
            as image, isnull(p.categoryId,1) as categoryId, isnull(c.categoryName,'No Category Added') as categoryName
            from Product p
            left outer join Category c on c.categoryId = p.categoryId
             where ProductId = @productId`,
            (err, recordset) => {
            if(!err) res.send(recordset.recordset)
          })

        } else {
          request.query(`Insert into Product(productname, productprice, productDescription,categoryId) 
                                      values(@name , @price, @description, @categoryId);

            select p.productid as id,isnull(p.productname,'') as name,isnull(p.productprice,0) as price,
            isnull(p.productDescription,'') as description,isnull(p.productImage,'product-image-placeholder.jpg') 
            as image, isnull(p.categoryId,1) as categoryId, isnull(c.categoryName,'No Category Added') as categoryName
            from Product p
            left outer join Category c on c.categoryId = p.categoryId
             where ProductId = SCOPE_IDENTITY()`,(err, recordset) => {
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

//GET Data from single product
router.get('/SingleProduct', getTokenDetails ,(req, res) => {
  const { productId } = req.query
  const { id } = req.user
  if((!isNaN(productId))){
    sql.connect(config, (err) => {
      let request = new sql.Request();
      request.input('productId', sql.Numeric, productId)
      request.input('customerid', sql.Numeric, id)

      console.log(id)
      request.query(`set nocount on
        if exists(select 1 from Product where productid=@productId)
          begin
            select p.productid as id,isnull(p.productname,'') as name,isnull(p.productprice,0) as price,
            isnull(p.productDescription,'') as description,isnull(p.productImage,'product-image-placeholder.jpg') 
            as image, isnull(p.categoryId,0) as categoryId, 
            isnull(c.categoryName,'No Category Added') as categoryName,
            isnull(o.orderItemid,0) as orderItemid 
            from Product p
            left outer join Category c on c.categoryId = p.categoryId
            left outer join OrderItems o on o.productid = p.productid and o.customerid = @customerid and o.itemStatus = 1
            where p.productid=@productId
          end
        else
          begin
          select 'not Found' as msg
          end
      `,(err, recordset) => {
        if(err){
          res.send(err)
        } else {
          res.send(recordset.recordset)
        }
      })
    })
  } else {
    res.status(400).json({
      status:'fail',
      message:'Invalid Request'
    })
  }
  
})

module.exports = router