import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core'
import { SERVER_URL } from '../../globalConstants';
import ProductDetailCard from './ProductDetailCard';

const useStyles = makeStyles((theme) => ({
  alert: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
}));

function ProductDetail() {
  const params = useParams()
  const classes = useStyles()
  const [product, setProduct] = useState({
    name: '', 
    image: '', 
    description:'', 
    price:'', 
    id:0,
    categoryName:'',
    orderItemid:0
  })
  const [error, setError] = useState('')

  useEffect(() => {
    let token = localStorage.getItem('token')

    if(!Boolean(token)){
       token = 0
    }

    if(!isNaN(params.productid)) {
      axios.get(`${SERVER_URL}/api/product/SingleProduct?productId=${params.productid}&token=${token}`)
      .then((res) => {
        setProduct(res.data[0])
      })
      .catch(err => {
        console.log(err)
      })
    } else {
      setError('Some Error Occured or Invalid Request')
    }
    
  },[])

  const setProductItemId = (id) => {
    setProduct({
      ...product,
      orderItemid: id
    })
  }
  
  return (
    <>
      {error.length > 0 ? 
        <div>Some Error Occured</div> : 
        <ProductDetailCard product={product} setProductItemId={setProductItemId}/>}
    </>
  )
}

export default ProductDetail
