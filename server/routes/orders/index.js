const express = require('express')
const sql = require('mssql')
const router = express.Router()
const { config } = require('../../globalConstants')
const { authenticateToken, getTokenDetails } = require('../../middleware/auth')

router.get('/myOrders', authenticateToken , (req, res) => {
    const { id } = req.user

    
})
