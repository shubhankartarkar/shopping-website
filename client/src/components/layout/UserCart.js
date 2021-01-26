import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { SERVER_URL } from '../../globalConstants';
import CartCard from './CartCard';

function UserCart() {
  const [cart, setCart] = useState([])
  
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
    console.log(orderItemId)
  }

  const checkOut = () => {
    axios.post(`${SERVER_URL}/api/cart/checkout`)
  }

  return (
    <div style={{margin:'auto'}}>
      {cart.length > 0 ? 
        cart.map(item => (
          <CartCard item={item} key={item.orderItemId} updateQuantity={updateQuantity} removeOrderItem={removeOrderItem}/>
        )) : <h1>No Items in Cart</h1>}
      <div>
        {cart.length > 0 ? <Button variant="contained" color="primary" onClick={checkOut}>Checkout</Button>: ''}
      </div>
    </div>
  )
}

export default UserCart
