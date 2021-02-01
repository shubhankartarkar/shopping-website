import React from 'react';
import { makeStyles, Card, CardContent, CardMedia, Typography, Button } from '@material-ui/core';
import { SERVER_STATIC_IMAGES } from '../../globalConstants';
import SelectQuantity from '../controls/SelectQuantity';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: 16,
    margin:5,
    boxShadow: 'none'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 200,
  }
}));

function CartCard(props) {
  const { orderItemId, productId, productName, productImage, quantity, productPrice } = props.item
  const { updateQuantity, removeOrderItem} = props
  let qty = [1,2,3,4,5,6]
  const classes = useStyles();
  
  return (
     <Card className={classes.root}>
       <CardMedia
        className={classes.cover}
        image={`${SERVER_STATIC_IMAGES}/${productImage}`}
        title={productName}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6">
            {productName}
          </Typography>
          <Typography variant="body1">
            Price: {productPrice} Total {productPrice * quantity}
          </Typography> <br/>
          <Typography variant="body1">
            <Button variant="outlined" color="primary" onClick={() => removeOrderItem(orderItemId)}>
              Remove
            </Button>
          </Typography>
          <div>
            <SelectQuantity value={quantity} data={qty} onChange={updateQuantity} orderItemId={orderItemId}/>
          </div>
        </CardContent>
      </div>
      
    </Card>
  )
}

export default CartCard
