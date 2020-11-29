import React from 'react'
import { Button, IconButton, AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

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

function ApplicationBar(props) {
  const classes = useStyles()

  const { toggleDrawer, title } = props
  return (
    <AppBar position="static">
    <Toolbar>
      <IconButton onClick={toggleDrawer} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" className={classes.title}>
        {title}
    </Typography>
      <Button color="inherit">Login</Button>
    </Toolbar>
  </AppBar>
  )
}

export default ApplicationBar
