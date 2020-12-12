import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Products from './layout/Products';
import Profile from './layout/Profile';
import SideDrawer from '../components/ApplicationBar/Drawer';
import ProductList from './Admin/Product/ProductList';
import CategoryList from './Admin/Category/CategoryList';
import { Grid } from '@material-ui/core';

function Main() {
  return (
    <BrowserRouter>
      <SideDrawer />
        <Grid container>
        <Switch>
          <Route exact path="/" component={Products} />
          <Route path="/Profile" component={Profile} />
          <Route path="/Products" component={ProductList} />
          <Route path="/Categories" component={CategoryList} /> 
        </Switch>
      </Grid>
    </BrowserRouter>
  )
}

export default Main