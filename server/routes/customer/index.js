const express = require('express')
const sql = require('mssql')
const router = express.Router()
const jwt = require('jsonwebtoken');
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
        request.input('password', sql.NVarChar, password)
        
        request.query(`
          IF NOT EXISTS(select 1 from customer where email=@email)
            BEGIN
                insert into customer(name, email, number, password)
                              values(@name, @email, @number, @password)
                select 'User Registered Successfully' as message

            END
          ELSE
            BEGIN
              select 'User already Exist!'  as message
            END
        ` , function(err, recordset){

          if(err){
            res.status(500).send('Some error occured');
          } else {
            res.json(recordset.recordset);
          }
        })
         
      }
    }
  })
})

//POST Login Customer
router.post('/login', (req, res) => {
  sql.connect(config, (err) => {
    if(err){
      res.send(err)
    } else {
      let { email, password } = req.body
      
      if(email.trim().length > 0 && password.trim().length >= 10){
        let request = new sql.Request()
        request.input('email', sql.VarChar, email)
        request.input('password', sql.NVarChar, password)
        
        request.query(`
          IF EXISTS(select 1 from customer where email=@email and password=@password)
            BEGIN
              selet customerid, name from customer where email=@email and password=@password
            END
          ELSE
            BEGIN
              select 'User already Exist!'  as message
            END
        ` , function(err, recordset){

          if(err){
            res.status(500).send('Some error occured');
          } else {
            const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });
            if (!token) {
              res.send('Couldnt sign the token')
            } else {
              res.json({ token, user : recordset.recordset })
            }
            
          }
        })
         
      }
    }
  })
})