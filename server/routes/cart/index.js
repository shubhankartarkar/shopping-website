const express = require('express')
const sql = require('mssql')
const router = express.Router()
const { config } = require('../../globalConstants')
const  { authenticateToken }  = require('../../middleware/auth')

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

module.exports = router