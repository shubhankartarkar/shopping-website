import React from 'react'
import { Button, IconButton, AppBar, Toolbar, Typography, makeStyles, Badge } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

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
  loginStatus: {
    textTransform: 'capitalize',
    fontSize: '1.2rem'
  },
  badge: {
    marginRight: theme.spacing(2)
  }
}));

function ApplicationBar(props) {
  const classes = useStyles()

  const { toggleDrawer, title, toggleDialog, user } = props
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton onClick={toggleDrawer} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        <Badge badgeContent={4} color="error" className={classes.badge}>
          <ShoppingCartIcon />
        </Badge>
        <Button color="inherit" className={classes.loginStatus} onClick={user.loggedIn ? console.log('') : toggleDialog}>
          {user.loggedIn ? user.name : 'Register'}
        </Button>
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(ApplicationBar)
