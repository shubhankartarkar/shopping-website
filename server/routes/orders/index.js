const e = require('express')
const express = require('express')
const sql = require('mssql')
const router = express.Router()
const { config } = require('../../globalConstants')
const { authenticateToken, getTokenDetails } = require('../../middleware/auth')

router.post('/userOrders', authenticateToken, (req, res) => {
	const { id } = req.user

	sql.connect(config, (err) => {
		if (err) {
			res.json({ message: 'error' })
		} else {
			let request = new sql.Request()
			request.input('customerid', id)
			request.query(`select o.orderId,
			dbo.formatdate(o.orderDate) as orderDate,o.orderstatus,
			dbo.formatdate(o.expectedDeliveryDate) as expectedDeliveryDate,
			dbo.formatdate(o.actualDeliveryDate) as actualDeliveryDate, ot.itemcount, ot.orderTotal
			from orders o
			join(
					select oi.orderid, count(oi.orderitemid) as itemcount, sum(p.productprice) as orderTotal
					from orderitems oi
					join Product p on oi.productid = p.productid
					group by orderid
			) ot on o.orderid = ot.orderId
			where customerId = @customerid and isnull(o.orderstatus,0) = 1
        `, (err, recordset) => {
				if (err) {
					res.json({ message: 'error' })
				} else {
					res.json({ message: 'success', orders: recordset.recordset })
				}
			})
		}
	})
})

router.get('/allOrders', (req, res) => {
	const { userType = '' } = req.query

	if (userType == 'A') {
		sql.connect(config, (err) => {
			if (err) {
				res.status(500).json({status: "error"})
			} else {
				let request = new sql.Request()
				request.query(`
				select o.orderId,
				dbo.formatdate(o.orderDate) as orderDate,o.orderstatus,
				dbo.formatdate(o.expectedDeliveryDate) as expectedDeliveryDate,
				dbo.formatdate(o.actualDeliveryDate) as actualDeliveryDate, ot.itemcount, ot.orderTotal,
				o.customerName, o.customerEmailId, o.contactNo
				from orders o
				join(
						select oi.orderid, count(oi.orderitemid) as itemcount, sum(p.productprice) as orderTotal
						from orderitems oi
						join Product p on oi.productid = p.productid
						group by orderid
				) ot on o.orderid = ot.orderId
					order by orderid desc
				`,(err, recordset) => {
					if(err){
						res.status(500).json({message: "error"})
					} else {
						res.json({message: 'success', orders: recordset.recordset})
					}
				})
			}
		})
	} else {
		res.status(401).json({ status: "error" })
	}
})

router.get('/orderDetails', (req, res) => {
	const { orderid = 0 } = req.query

	if (orderid > 0) {
		sql.connect(config, (err) => {
			if (err) {
				res.status(500).json({status: "error"})
			} else {
				let request = new sql.Request()
				request.input('orderid',sql.Numeric,orderid)
				request.query(`
					select o.orderItemId,o.productId, o.quantity, o.itemStatus,
					p.productName,p.productprice
					from orderitems o  
					join product p on p.productid = o.productid
					where orderid = @orderid
				`,(err, recordset) => {
					if(err){
						res.status(500).json({message: "error"})
					} else {
						res.json({status: 'success', orders: recordset.recordset})
					}
				})
			}
		})
	} else {
		res.status(401).json({ status: "error" })
	}
})

module.exports = router