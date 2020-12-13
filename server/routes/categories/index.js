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
      request.query(`select categoryId, categoryName from Category`, function (err, recordset) {

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
      let { categoryId, name } = req.body

      if(name.length > 0){
        let request = new sql.Request()
        request.input('name', sql.NVarChar,name)
        
        if(categoryId > 0){
          request.input('categoryId', sql.Int,categoryId)
          request.query(`update Category set categoryName = @name where categoryId = @categoryId; 
            select * from Category where categoryId = @categoryId`,(err, recordset) => {
            if(err){
              res.send(err)
            } else {
              res.send(recordset.recordset)
            } 
          })

        } else {
          request.query(`Insert into Category(categoryName) values(@name);
          select * from Category where categoryId = SCOPE_IDENTITY()`,(err, recordset) => {
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