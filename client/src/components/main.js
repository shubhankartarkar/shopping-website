import React, { useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Products from './Layout/Products';
import MyOrders from './Layout/MyOrders';
import ProductDetail from './Layout/ProductDetail';
import SideDrawer from '../components/ApplicationBar/Drawer';
import ProductList from './Admin/Product/ProductList';
import CategoryList from './Admin/Category/CategoryList';
import { SERVER_URL } from '../globalConstants'
import { loginUser } from '../Store/User/UserActions';
import { setCartCount } from '../Store/Cart/CartActions'
import UserCart from './Layout/UserCart';
import OrderList from './Admin/Orders/OrderList'

function Main(props) {
  const { loginSuccess, cartCount } = props

  useEffect(() => {
    checkUser()
  },[])

  const checkUser = () => {
    if(localStorage.getItem('token')){
      let token = localStorage.getItem('token')

      axios.post(`${SERVER_URL}/api/customer/verifyToken`, {token})
        .then(res => {
          loginSuccess(res.data)
          cartCount(res.data.user[1][0].count)
        })
    }
  }

  return (
    <BrowserRouter>
      <SideDrawer />
        <Grid container>
        <Switch>
          <Route exact path="/" component={Products} />
          <Route path="/MyOrders" component={MyOrders} />
          <Route path="/Products" component={ProductList} />
          <Route path="/ProductDetail/:productid" component={ProductDetail} />
          <Route path="/Categories" component={CategoryList} /> 
          <Route path="/user/cart" component={UserCart} /> 
          <Route path="/Orders" component={OrderList} /> 
          <Route path="/my-orders" component={MyOrders} /> 
        </Switch>
      </Grid>
    </BrowserRouter>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    loginSuccess: (data) => dispatch(loginUser(data)),
    cartCount: (count) => dispatch(setCartCount(count))
  }
}

export default connect(null, mapDispatchToProps)(Main)