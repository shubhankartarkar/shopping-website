import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, makeStyles } from '@material-ui/core';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { connect } from 'react-redux';
import { addEditProduct } from '../../../Store/Admin/Product/ProductAction';
import TextInput from '../../controls/TextInput';
import ProductImage from './ProductImage';

const useStyles = makeStyles(theme => ({
  gridItem: {
    padding: 5
  }
}))

function ProductForm(props) {
  const { open, toggleModal, productId, product: { products, saving }, addEditProduct } = props
  const classes = useStyles()
  const initialState = {
    id: productId,
    name: '',
    price: 1,
    description: '',
    categoryId: 0,
    image:''
  }  

  const [product, setProduct] = useState(initialState)

  useEffect(() => {
    if (open) {
      getProduct();
    }

    return () => {
      setProduct(initialState)
    }
  }, [open])

  const getProduct = () => {
    products.map(p => {
      if(p.id === productId) {
        setProduct(p)
      }
    })
  }

  const saveCategory = () => {
    addEditProduct(product)
    //addEditProduct
    if (!saving) {
      toggleModal()
    }
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    })
  }

  const setProductImage = (id, path) => {
    setProduct({
      ...product,
      id:id,
      image: path
    })  
  }

  return (
    <div>
      <Dialog fullWidth disableBackdropClick open={open} onClose={toggleModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{productId > 0 ? 'Edit' : 'Add'} Product</DialogTitle>
        <DialogContent>
        <Grid container>
          <Grid item md={6} className={classes.gridItem}>
            <TextInput name="name" label="Product Name" value={product.name} onChange={handleInput} />
            <TextInput name="price" label="Product Price" value={product.price} onChange={handleInput} />
            <TextInput name="description" label="Product Description" value={product.description} onChange={handleInput} multiline rowsMax={4} />
          </Grid>
          <Grid item md={6} className={classes.gridItem}>
            <ProductImage setProductImage={setProductImage} id={product.id} image={product.image} tempProductId={productId}/>
          </Grid>
          </Grid>

        </DialogContent>
        <DialogActions>
          <Button onClick={toggleModal} color="primary">
            Cancel
          </Button>
          <Button onClick={() => (saveCategory())} color="primary">
            {saving ? <AutorenewIcon /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    product: state.adminProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addEditProduct: (data) => dispatch(addEditProduct(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm)
