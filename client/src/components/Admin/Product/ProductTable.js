import React, { useState } from 'react';
import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import ProductForm from './ProductForm';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    textAlign: 'center',

    '& .MuiTableCell-root': {
      textAlign: 'center',
      padding: theme.spacing(1)
    },

    '& .MuiTableHead-root': {
      background: theme.palette.success.main
    },

    '& .MuiTableHead-root .MuiTableCell-root': {
      color: 'white'
    }
  },
  paper: {
    margin: '10px auto',
    maxWidth: 900,
    padding: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1),
    float: 'right'
  },
}));

function ProductTable(props) {
  const { products } = props;
  const classes = useStyles()

  const [open, setOpen] = useState(false);
  let [productId, setProductId] = useState(0)

  const toggleModal = () => {
    setOpen(!open)
  }

  return (
    <>
      <ProductForm open={open} toggleModal={toggleModal} productId={productId}/>
      <TableContainer component={Paper} className={classes.paper}>
        <Button onClick={() => (setProductId(0), toggleModal())} variant="contained" color="secondary" className={classes.button} startIcon={<AddIcon />}>Add</Button>
        <Table className={classes.root} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow key={row.productId}>
                <TableCell component="th" scope="row">
                  <EditIcon onClick={() => (setProductId(row.productId), toggleModal())} />
                </TableCell>
                <TableCell>{row.productName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ProductTable
