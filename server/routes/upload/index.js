const express = require('express');
const sql = require("mssql");
const router = express.Router();
const multer = require('multer')
const { config } = require('../../globalConstants')

router.post('/', (req, res) => {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      cb(null, +new Date() + file.originalname)
    }
  })

  var upload = multer({ storage: storage }).single('file')

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    else {
      saveToDb(req, res);
    }
  })
})

function saveToDb(req, res) {
  const { productId } = req.body
  
  sql.connect(config, (err) => {
      if(err){
        res.send('Some error occured connecting')
      }
      else {
        if(productId == 0){
          const request = new sql.Request()
          request.input('image',sql.VarChar,req.file.filename)
          request.query(`Insert into Product(productImage) values(@image);
            select productid, productImage from Product where productid=SCOPE_IDENTITY()`,(err, recordset) => {
              res.json({...recordset.recordset[0],"status":"success","type":"insert"})
              //response.json({"status":"success","type":"insert","id":result.insertId,"fileName":request.file.filename})
          })
        }
        else if(productId > 0){
          const request = new sql.Request()
          request.input('image', sql.VarChar, req.file.filename)
          request.input('productid', sql.Int, productId)
          request.query(`update Product set productImage = @image where productid = @productid;
            select productid, productImage from Product where productid=@productid`,(err, recordset) => {
              res.json({...recordset.recordset[0],"status":"success","type":"update"})
              //response.json({"status":"success","type":"insert","id":result.insertId,"fileName":request.file.filename})
          })
        }
      }
    })

}

module.exports = router