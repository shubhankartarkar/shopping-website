const express = require('express')
const sql = require('mssql')
const router = express.Router()
const jwt = require('jsonwebtoken');
const { config, JWT_SECRET_KEY } = require('../../globalConstants')
const  { authenticateToken }  = require('../../middleware/auth')

//POST Register Customer
router.post('/register', (req, res) => {
  console.log(req.body)
  sql.connect(config, (err) => {
    if (err) {
      res.send(err)
    } else {
      let { name, email, number, password } = req.body

      if (name.length > 0 && email.length > 0 && number.length >= 10) {
        let request = new sql.Request()
        request.input('name', sql.NVarChar, name)
        request.input('email', sql.VarChar, email)
        request.input('number', sql.Numeric, number)
        request.input('password', sql.NVarChar, password)

        request.query(`
          IF NOT EXISTS(select 1 from customer where CustomerEmail = @email)
            BEGIN
                insert into customer(CustomerName, CustomerEmail, CustomerNumber, password)
                              values(@name, @email, @number, @password)
                select 'User Registered Successfully' as message
            END
          ELSE
            BEGIN
              select 'User already Exist!' as message
            END` , function (err, recordset) {

              if (err) {
                res.status(500).send('Some error occured');
              } else {
                res.json('success');
              }
            })

          }
        }
  })
})

//POST Login Customer
router.post('/login', (req, res) => {
  sql.connect(config, (err) => {
    if (err) {
      res.json({status:"fail"})
    } else {
      let { email, password } = req.body

      if (email.trim().length > 0 && password.trim().length >= 10) {
        let request = new sql.Request()
        request.input('email', sql.VarChar, email)
        request.input('password', sql.NVarChar, password)

        request.query(`
          IF EXISTS(select 1 from customer where CustomerEmail=@email and password=@password)
            BEGIN
              select top 1 customerid as id, rtrim(ltrim(CustomerName)) as name from customer where CustomerEmail=@email and password=@password
            END
          ELSE
            BEGIN
              select 'No Such User Exist'  as message
            END` , function (err, recordset) {

          if (err) {
            res.json({status:"fail",message:"Some error occured"});
          } else {
            if(recordset.recordset[0].hasOwnProperty('id')){
              const token = jwt.sign({ id: recordset.recordset[0].id }, JWT_SECRET_KEY, { expiresIn: 36000000 });
              if (!token) {
                res.send({status:"fail"})
              } else {
                res.json({ status:"success", token, user: recordset.recordset[0] })
              }
            } else {
              res.json({
                status:"fail",
                message:"No User Found"
              })
            }
          }
        })

      }
    }
  })
})

//POST Verify User Token
router.post('/verifyToken', authenticateToken , (req, res) => {
  sql.connect(config, (err) => {
    if(err){
      res.send('Some Error Occured')
    }else {
      let request = new sql.Request()
      request.input('customerid',sql.Int, req.user.id)

      request.query(`select customerid as id, rtrim(ltrim(CustomerName)) as name 
        from customer where customerid = @customerid`, function(err, recordset) {
          res.json({ status:"success",token: req.body.token, user: recordset.recordset[0] })
        })
    }
  })
})

module.exports = router