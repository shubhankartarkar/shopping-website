const express = require('express')
const sql = require('mssql')
const router = express.Router()
const { config } = require('../../globalConstants')
const  { authenticateToken, getTokenDetails }  = require('../../middleware/auth')

router.post('/addItem', authenticateToken , (req, res) => {
  sql.connect(config, (err) => {
    if(err){
      res.send(err)
    } else {
      let { token, id } = req.body
      let { id: customerId } = req.user

      if(token.length > 0 && id > 0 && customerId > 0){
        let request = new sql.Request()
        request.input('customerId', sql.Numeric, customerId)
        request.input('productId', sql.Numeric, id)
        request.query(`Insert into OrderItems(productId, customerId, Quantity, itemStatus)
                                        values(@productId,@customerId,1, 1);
                        select SCOPE_IDENTITY() as orderitemid`,(err,recordset) => {
          if(err){
            res.send(err)
          } else {
            res.json(recordset.recordset)
          }
        })
      }
    }
  })
})

router.get('/userCart', getTokenDetails, (req, res) => {
  const { id } = req.user
  sql.connect(config, (err) => {
    if(err){
      res.json({message: 'Some error occured'})
    } else {

      let request = new sql.Request()
      request.input('customerId', sql.Numeric, id)
      request.query(`select oi.orderItemId, oi.productid as productId, p.productName, oi.quantity, p.productImage
                      from OrderItems oi
                      join product p on p.productid = oi.productid
                      where oi.customerid = @customerId and oi.itemstatus = 1`, (err, recordset) => {
            if(err){
              res.json({message: 'Some error occured'})
            } else {
              res.send(recordset.recordset)
            }
      })
    }
  })
})

router.post('/updateQuantity', (req, res) => {
  const { orderItemId, quantity} = req.body

  if(orderItemId > 0 && quantity > 0){
    sql.connect(config, (err) => {
      if(err){
        res.json({message:'error'})  
      } else {
        let request = new sql.Request()
        request.input('orderItemId', orderItemId)
        request.input('quantity', quantity)

        request.query(`update OrderItems set quantity = @quantity where orderItemId = @orderItemId`, (err, recordset) => {
          if(err){
            res.json({message:'error'})  
          } else  {
            res.json({message: 'success'})  
          }
        })
      }
  })
  } else {
    res.json({message:'error'})
  }
})

module.exports = router