import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Typography } from '@material-ui/core';
import axios from 'axios';
import { SERVER_URL } from '../../globalConstants';

function OrderModal(props) {
  const { open, toggleModal, selectedOrderId } = props
  let [orderInfo, setOrderInfo] = useState([])
  let [orderTotal, setOrderTotal] = useState(0)

  useEffect(() => {
    if(selectedOrderId > 0){
      axios.get(`${SERVER_URL}/api/order/orderDetails?orderid=${selectedOrderId}`)
      .then(res => {
        let { status, orders = [] } = res.data
        if(status == 'success'){
          setOrderInfo(orders)  
          setOrderTotal(orders.map(a => a.productprice).reduce((a,b) => a + b,0))
        }
      })
      .catch(err => {
        console.log(err)
      })
    }

    return () => {
      setOrderInfo([])
    }
  },[selectedOrderId])

  return (
    <Dialog fullWidth disableBackdropClick open={open} onClose={toggleModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Order Details: Total Rs.{orderTotal}
        </DialogTitle>
        <DialogContent>
         {
           orderInfo.length > 0 && orderInfo.map(p => (
             <Paper elevation={0} style={{marginTop: '10px',border: '1px solid #eee',padding:'10px'}}>
               <Typography>{p.productName}</Typography>
               <Typography>Qty: {p.quantity} Price: {p.productprice}</Typography>
             </Paper>
           ))
         }
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleModal}>Close</Button>
        </DialogActions>
      </Dialog>
  )
}

export default OrderModal
