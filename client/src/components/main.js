import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Products from './layout/Products';
import Profile from './layout/Profile';
import SideDrawer from '../components/ApplicationBar/Drawer';

function Main() {
  return (
    <BrowserRouter>
       <SideDrawer/>
          <Switch>
            <Route exact path="/" component={Products}/>
            <Route path="/Profile" component={Profile}/>
          </Switch>
      </BrowserRouter>
  )
}

export default Main
