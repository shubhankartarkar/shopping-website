const express = require('express')
const sql = require('mssql')
const router = express.Router()
const { config } = require('../../globalConstants')

router.post('cart/addItem', (req, res) => {
  sql.connect(config, (err) => {
    if(err){
      res.send(err)
    } else {
      let { customerId, productId } = req.body

      if(customerId > 0 && productId > 0){
        let request = new sql.Request()
        request.input('customerId', sql.Numeric, customerId)
        request.input('productId', sql.Numeric, productId)

        request.query(`Insert into OrderItems(productId, customerId)value(@productId,@customerId)`,(err,recordset) => {
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