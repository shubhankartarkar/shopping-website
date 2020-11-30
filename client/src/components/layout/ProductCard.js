import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
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
  const { name, image, description, price, id }  = props.product;
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
          {price}
        </Button>
        <Button size="small" color="primary">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard