import React from 'react';
import { makeStyles, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { SERVER_STATIC_IMAGES, SERVER_URL } from '../../globalConstants';

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

const formatPrice = (price) => {
  return (<span>&#x20b9; {price}</span>)
}

function ProductDetailCard(props) {
  const classes = useStyles();
  const history = useHistory()
  const { categoryName, description, id, image ,name, price, categoryId, orderItemid } = props.product;
  const { setProductItemId } = props
  const addItem = () => {
    let token = localStorage.getItem('token')

    if(Boolean(token)){
      let data = { token, id}

      axios.post(`${SERVER_URL}/api/cart/addItem`,data)
        .then((res) => {
          console.log(res)
          setProductItemId(res.data[0].orderitemid)
        })
    } else {
      // Show Login Modal
    }

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
        {   orderItemid > 0 ? 
            (<Button size="small" color="primary" onClick={() => history.push('/user/cart')}>
              Go to Cart
            </Button>) : 
            (<Button size="small" color="primary" onClick={() => addItem()}>
           Add to Cart 
          </Button>)
        }
      </CardActions>
    </Card>
  )
}

export default ProductDetailCard

