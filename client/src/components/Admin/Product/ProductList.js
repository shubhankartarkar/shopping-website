import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux';
import { LinearProgress } from '@material-ui/core'

import ProductTable from '../Product/ProductTable';
import ErrorComponent from '../ErrorComponent';
import { fetchProduct } from '../../../Store/Admin/Product/ProductAction';

const ProductList = (props) => {
  const { products, fetchProduct } = props

  useEffect(() => {
    fetchProduct()
  },[])

  function renderProducts(){
    if(products.loading){
      return <LinearProgress color="secondary" style={{width: '100%'}}/>
    }
    else if(products.error.length > 0){
      return <ErrorComponent error={products.error}/>
    }
    else {
      return <ProductTable products={products.products}/>
    }
  }

  return (
    <Fragment>
        {renderProducts()}
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {  
    products: state.adminProduct
  } 
}

const mapDispatchToProps = dispatch  => {
  return {
    fetchProduct: () => dispatch(fetchProduct())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
