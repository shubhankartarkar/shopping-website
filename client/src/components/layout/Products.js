import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../../Store/Product/ProductActions';
import { CircularProgress, makeStyles } from '@material-ui/core';
import ProductCard from './ProductCard';

const useStyles = makeStyles({
  productWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginTop: '20px'
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
        return <CircularProgress />
      }
    } else {
      return <CircularProgress />
    }
  }

  return (
    <div className={classes.productWrapper}>
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
