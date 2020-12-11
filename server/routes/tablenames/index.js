const express = require('express');
const sql = require("mssql");
const router =  express.Router()

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
      request.query(`select TABLE_NAME,COLUMN_NAME from INFORMATION_SCHEMA.columns`, function (err, recordset) {
        if (err) {
          res.send(err)
        } else {
          res.json(recordset.recordset);
        }
      });
    }
  })
})

module.exports = router