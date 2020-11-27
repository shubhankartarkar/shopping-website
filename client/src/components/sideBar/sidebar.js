import React from 'react'
import { NavLink } from 'react-router-dom';
import { makeStyles, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({

})

const useStyles = makeStyles(theme => ({
  sidebar: {
    background: theme.palette.primary.dark,
    padding: `${theme.spacing(2)}px 0px`,
    height:'100vh',
    width:'200px',
    textAlign:'center'
  },
  navList: {
    listStyle:'none',
    '& li': {
      margin:'10px',
      backgroundColor:theme.palette.primary.light
    },
    '& a': {
      textDecoration:'none',
      color:'#fff',
      fontSize:'1rem'
    }
  }
}))

function Sidebar() {
  const classes = useStyles()

  return (
    <div className={classes.sidebar}>
      <ul className={classes.navList}>
        <li>
          <NavLink to="/">Page 1</NavLink>
        </li>
        <li>
          <NavLink to="/page2">page2</NavLink>
        </li>
        <li>
          <NavLink to="/page3">page3</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
