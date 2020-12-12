import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Products from './layout/Products';
import Profile from './layout/Profile';
import SideDrawer from '../components/ApplicationBar/Drawer';
import AddProduct from './Admin/Product/AddProduct';
import ProductList from './Admin/Product/ProductList';
import AddCategory from './Admin/Category/AddCategory';
import CategoryList from './Admin/Category/CategoryList';
import { Grid } from '@material-ui/core';

function Main() {
  return (
    <BrowserRouter>
      <SideDrawer />
      <Grid container alignItems="flex-start">
        <Grid item md={12} style={{margin:'auto'}}>
        <Switch>
          <Route exact path="/" component={Products} />
          <Route path="/Profile" component={Profile} />
          <Route path="/Add-Product" component={AddProduct} />
          <Route path="/Products" component={ProductList} />
          <Route path="/Add-Category" component={AddCategory} />
          <Route path="/Categories" component={CategoryList} /> 
        </Switch>
      </Grid>
      </Grid>
    </BrowserRouter>
  )
}

export default Main
