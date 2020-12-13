import React, { useState } from 'react';
import { Button, Input } from '@material-ui/core'
import { SERVER_STATIC_IMAGES, SERVER_URL } from '../../../globalConstants';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  image: {
    height:100,
    width:100
  },
  button: {
    marginTop:8
  }
}))

function ProductImage(props) {
  const { image, tempProductId, id, setProductImage } = props
  const classes = useStyles()
  const [selectedFile, setSelectedFile] = useState({})

  function fileChangeHandler(event){
    setSelectedFile(event.target.files[0])
  }

  function fileSubmitHandler() {
    const data = new FormData();
    let uploadId = 0;
    uploadId = id > 0 ? id : tempProductId
    data.append('file', selectedFile)
    data.append('productId',uploadId)

    axios.post(`${SERVER_URL}/api/upload`,data)
      .then(res => {
        console.log(res)
        const {status, type, productid, productImage} = res.data

         if(status === 'success' && type == 'insert' && productid > 0){
          setProductImage(productid,productImage)
         }
         else if(status === 'success' && type == 'update' && productid > 0){
          setProductImage(productid,productImage)
         }
         else {
            console.log('Error Occured')
         }
        })
  }
        

  return (
    <div>
      <img src={`${SERVER_STATIC_IMAGES}${image}`} className={classes.image}/>
      <Input type="file" name="file" onChange={fileChangeHandler}/>
      <Button variant="contained" className={classes.button} color="secondary" onClick={fileSubmitHandler}>{id > 0 ? 'Update' : 'Add'} Image</Button>
    </div>
  )
}

export default ProductImage
