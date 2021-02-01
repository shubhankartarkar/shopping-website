import React, { useEffect, useState } from 'react';
import { Button, Paper, Typography } from '@material-ui/core';
import axios from 'axios';
import { SERVER_URL } from '../../globalConstants';
import CartCard from './CartCard';

function UserCart() {
  const [cart, setCart] = useState([])
  const [cartTotal, setCartTotal] = useState(0)
  const [checkOutSuccess, setCheckOutSuccess] = useState(false)
  
  useEffect(() => {
    let token = localStorage.getItem('token')

    if(Boolean(token)){
      axios.get(`${SERVER_URL}/api/cart/userCart?token=${token}`)
      .then(res => {
        setCart(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
  },[])

  useEffect(() => {
    setCartTotal(cart.map(p => p.productPrice * p.quantity).reduce((a, b) => a + b,0))
  }, [cart])

  const updateQuantity = (e, orderItemId) => {
    let updateCart = cart
    let data = { orderItemId , quantity: e.target.value }
    axios.post(`${SERVER_URL}/api/cart/updateQuantity`,data)
      .then(res => {
        if(res.data.message == 'success'){
          updateCart.forEach(item => {
            if(item.orderItemId == orderItemId){
              item.quantity = e.target.value
            }
          })
          setCart([...updateCart])
        }
      }).catch(err => {
        console.log(err)        
      })
  }

  const removeOrderItem = (orderItemId) => {
    axios.post(`${SERVER_URL}/api/cart/removeItem`, { orderItemId })
      .then(res => {
        console.log(res.data)
        if(res.data.message == 'success'){
          setCart(cart.filter(item => item.orderItemId != res.data.deleteId))
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const checkOut = () => {
    let token = localStorage.getItem('token')
    axios.get(`${SERVER_URL}/api/cart/checkout?token=${token}`)
      .then(res => {
        console.log(res.data)
          if(res.data.message == "success"){
            setCheckOutSuccess(true)
          }
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Paper style={{margin:'auto'}}>
      {cart.length > 0 ? 
        cart.map(item => (
          <CartCard item={item} key={item.orderItemId} updateQuantity={updateQuantity} removeOrderItem={removeOrderItem}/>
        )) : <h1>No Items in Cart</h1>}
      <Typography component="h6" variant="h6" style={{textAlign:'center'}}>
        Cart  Total: {cartTotal}
      </Typography>
      <div>
        {cart.length > 0 ? 
        <Button style={{display:'block',width:'100%', margin:'auto'}} variant="contained" color="primary" onClick={checkOut}>Checkout</Button>: ''}
      </div>
    </Paper>
  )
}

export default UserCart
