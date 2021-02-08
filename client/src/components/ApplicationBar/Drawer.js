import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ApplicationBar from './ApplicationBar';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../User/RegisterForm';

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

function SideDrawer(props) {
  const classes = useStyles();
  const history = useHistory();

  let { userType } = props
  
  const [state, setState] = useState({
    left: false
  });

  //Register form dialog
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
       {  [{linkName: 'All Products', path: '/', userType:'U'},
          {linkName: 'Add Category', path: '/Categories',userType:'A'},
          {linkName: 'Add Product', path: '/Products',userType:'A'},
          {linkName: 'View Orders', path: '/Orders',userType:'A'},
          {linkName: 'My Orders', path: '/my-orders',userType:'U'},
          {linkName: 'Admins', path: '/Admins',userType:'A'}
          ].map((link, idx) => {
            if(link.userType === userType){
              return (<ListItem key={idx} button onClick={() => (history.push(`${link.path}`))}>
                <ListItemIcon><CalendarTodayIcon/></ListItemIcon>
                <ListItemText primary={link.linkName}/>
              </ListItem>)
            }
          })
       } 
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <ApplicationBar toggleDrawer={toggleDrawer} title="E Commerce" toggleDialog={toggleDialog}/>
        <Drawer anchor="left" open={state.left} onClose={() => toggleDrawer()}>
          {list()}
        </Drawer>
        <RegisterForm open={open} toggleDialog={toggleDialog}/>
      </React.Fragment>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    userType: state.user.userType
  }
}

export default connect(mapStateToProps)(SideDrawer)