import React, { useState } from 'react';
import { Snackbar, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiSnackbarContent-root' : {
      backgroundColor:'green'
    }
  }
}))

function SnackBar(props) {
  let classes = useStyles()
  let { message = '', open, toggleSnackBar } = props

  const [state, setState] = useState({
    vertical: 'top',
    horizontal: 'right',
  });

  const { vertical, horizontal } = state;

  return (
    <>
      <Snackbar className={classes.root}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={toggleSnackBar}
        autoHideDuration={6000}
        message={message}
        key={vertical + horizontal}
      >
      </Snackbar>
    </>
  );
}

export default SnackBar