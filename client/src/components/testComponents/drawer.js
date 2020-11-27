import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Button, IconButton, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/Inbox';

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
  const [state, setState] = useState({
    left: false
  });

  const toggleDrawer = () => {
    setState((prevState) => ({ ...prevState,left: !prevState.left }));
  };

  const list = () => (
    <div className={classes.list} onClick={() => toggleDrawer()} onKeyDown={() => toggleDrawer()} role="presentation">
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={() => toggleDrawer()} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              News
          </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={state.left} onClose={() => toggleDrawer()}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
