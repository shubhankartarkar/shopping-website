import React from 'react';
import { makeStyles, Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { SERVER_STATIC_IMAGES } from '../../globalConstants';
import SelectQuantity from '../controls/SelectQuantity';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: 16,
    margin:5
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
  const { orderItemId, productId, productName, productImage, quantity } = props.item
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
          <Typography component="h5" variant="h5">
            {productName}
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
