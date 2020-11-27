import React from 'react';
import { makeStyles } from '@material-ui/core'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SideBar from './sideBar/sidebar';
import page1 from './layout/page1/page1';
import page2 from './layout/page2/page2';
import page3 from './layout/page3/page3';

const useStyles  = makeStyles({
  containerWrapper: {
    display:'flex',
  },
  sideBar:{
    backgroundColor:'red'
  }
})

function Main() {
  const classes = useStyles();

  return (
    <BrowserRouter>
       <div className={classes.containerWrapper}>
          <SideBar/>
          <Switch>
            <Route exact path="/" component={page1}/>
            <Route path="/page2" component={page2}/>
            <Route path="/page3" component={page3}/>
          </Switch>
        </div>
      </BrowserRouter>
  )
}

export default Main
