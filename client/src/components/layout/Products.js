import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../../Store/Product/ProductActions';
import { LinearProgress, makeStyles } from '@material-ui/core';
import ProductCard from './ProductCard';

const useStyles = makeStyles({
  productWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginTop: '20px',
    width:'100%',
    justifyContent: 'center'
   }
})

function Products(props) {
  const classes = useStyles()
  const { products, fetchProducts } = props

  useEffect(() => {
    fetchProducts()
  }, [])

  const renderProducts = () => {
    if (!products.loading) {
      if (products.products.length > 0) {
        return products.products.map(product => {
          return <ProductCard product={product} key={product.id}/>
        })
      } else {
        return <LinearProgress color="secondary" style={{width: '100vw'}}/>
      }
    } else {
      return <LinearProgress color="secondary" style={{width: '100vw'}}/>
    }
  }

  return (
    <div className={products.loading ? '': classes.productWrapper}>
      {renderProducts()}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
