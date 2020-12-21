import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ApplicationBar from './ApplicationBar';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../User/RegisterForm'

const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function SideDrawer() {
  const classes = useStyles();
  const history = useHistory();

  const [state, setState] = useState({
    left: false
  });

  //login form dialog
  const [open, setOpen] = useState(false)

  const toggleDialog = () => {
    setOpen(!open)
  }

  const toggleDrawer = () => {
    setState((prevState) => ({ ...prevState, left: !prevState.left }));
  };

  const list = () => (
    <div className={classes.list} onClick={() => toggleDrawer()} onKeyDown={() => toggleDrawer()} role="presentation">
      <List>
        <ListItem button onClick={() => (history.push('/'))}>
          <ListItemIcon><CalendarTodayIcon/></ListItemIcon>
          <ListItemText primary="All Products"/>
        </ListItem>
        <ListItem button onClick={() => (history.push('/Profile'))}>
          <ListItemIcon><CalendarTodayIcon/></ListItemIcon>
          <ListItemText primary="My Profile"/>
        </ListItem>
        <ListItem button onClick={() => (history.push('/Categories'))}>
          <ListItemIcon><CalendarTodayIcon/></ListItemIcon>
          <ListItemText primary="Add Category"/>
        </ListItem>
        <ListItem button onClick={() => (history.push('/Products'))}>
          <ListItemIcon><CalendarTodayIcon/></ListItemIcon>
          <ListItemText primary="Add Product"/>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <ApplicationBar toggleDrawer={toggleDrawer} title="Test" toggleDialog={toggleDialog}/>
        <Drawer anchor="left" open={state.left} onClose={() => toggleDrawer()}>
          {list()}
        </Drawer>
        <RegisterForm open={open} onClose={toggleDialog}/>
      </React.Fragment>
    </div>
  );
}