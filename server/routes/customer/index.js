const express = require('express')
const sql = require('mssql')
const router = express.Router()
const { config } = require('../../globalConstants')

//POST Register Customer
router.post('/register', (req, res) => {
  sql.connect(config, (err) => {
    if(err){
      res.send(err)
    } else {
      let { name, email, number } = req.body
      
      if(name.length > 0 && email.length > 0 && number.length >= 10){
        let request = new sql.Request()
        request.input('name', sql.NVarChar, name)
        request.input('email', sql.VarChar, email)
        request.input('number', sql.Numeric, number)

         
      }
    }
  })
})