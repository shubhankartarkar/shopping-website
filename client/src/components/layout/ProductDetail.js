import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core'
import { SERVER_URL } from '../../globalConstants';

const useStyles = makeStyles((theme) => ({
  alert: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
}));

function ProductDetail() {
  const params = useParams()
  const classes = useStyles()
  const [error, setError] = useState('')

  useEffect(() => {
    if(!isNaN(params.productid)) {
      axios.get(`${SERVER_URL}/api/product/SingleProduct?productId=${params.productid}`)
      .then((res) => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    } else {
      setError('Some Error Occured or Invalid Request')
    }
    
  },[])

  return (
    <>
      {error.length > 0 ? <Alert className={classes.alert} severity="error">{error}</Alert> : null}
    </>
  )
}

export default ProductDetail
