import React, { useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Products from './Layout/Products';
import Profile from './Layout/Profile';
import ProductDetail from './Layout/ProductDetail';
import SideDrawer from '../components/ApplicationBar/Drawer';
import ProductList from './Admin/Product/ProductList';
import CategoryList from './Admin/Category/CategoryList';
import { SERVER_URL } from '../globalConstants'
import { loginUser } from '../Store/User/UserActions';
import UserCart from './Layout/UserCart';

function Main(props) {
  const { loginSuccess } = props

  useEffect(() => {
    checkUser()
  },[])

  const checkUser = () => {
    if(localStorage.getItem('token')){
      let token = localStorage.getItem('token')

      axios.post(`${SERVER_URL}/api/customer/verifyToken`, {token})
        .then(res => {
          loginSuccess(res.data)
        })
    }
  }

  return (
    <BrowserRouter>
      <SideDrawer />
        <Grid container>
        <Switch>
          <Route exact path="/" component={Products} />
          <Route path="/Profile" component={Profile} />
          <Route path="/Products" component={ProductList} />
          <Route path="/ProductDetail/:productid" component={ProductDetail} />
          <Route path="/Categories" component={CategoryList} /> 
          <Route path="/user/cart" component={UserCart} /> 
        </Switch>
      </Grid>
    </BrowserRouter>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    loginSuccess: (data) => dispatch(loginUser(data))
  }
}

export default connect(null, mapDispatchToProps)(Main)