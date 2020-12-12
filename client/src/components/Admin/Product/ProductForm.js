import React, { useEffect, useState } from 'react'
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { connect } from 'react-redux';
import { addEditCategory } from '../../../Store/Admin/Product/ProductAction'

function ProductForm(props) {
  const { open, toggleModal, categoryId, product: { products, saving }, addEditCategory } = props
  const [category, setCategory] = useState('')

  useEffect(() => {
    if (open) {
      getCategoryName();
    }

    return () => {
      setCategory('')
    }
  }, [open])

  const getCategoryName = () => {
    products.map(c => {
      if(c.categoryId === categoryId) {
        setCategory(c.categoryName)
      }
    })
  }

  const saveCategory = () => {
    addEditCategory({ categoryId, name: category })
    if (!saving) {
      toggleModal()
    }
  }

  return (
    <div>
      <Dialog fullWidth disableBackdropClick open={open} onClose={toggleModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{categoryId > 0 ? 'Edit' : 'Add'} Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            autoComplete="off"
            id="categoryName"
            label="Category Name"
            type="text"
            fullWidth
            variant="outlined"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
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
    product: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addEditCategory: (data) => dispatch(addEditCategory(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm)
