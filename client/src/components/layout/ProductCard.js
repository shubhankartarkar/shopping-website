import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom'

import { SERVER_STATIC_IMAGES } from '../../globalConstants';

const useStyles = makeStyles({
  root: {
    width: '300px',
    padding: '10px',
    paddingTop: 0

  },
  media: {
    height: 140,
    backgroundPosition: 'center',
    backgroundSize: 'contain'
  },
});

function ProductCard(props) {
  const classes = useStyles();
  const history = useHistory()
  const { name, image, description, price, id }  = props.product;

  const formatPrice = (price) => {
    return (<span>&#x20b9; {price}</span>)
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`${SERVER_STATIC_IMAGES}/${image}`}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
        {formatPrice(price)}
        </Button>
        <Button size="small" color="primary" onClick={() => history.push(`/ProductDetail/${id}`)}>
          View Product Details
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard