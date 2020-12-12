import React, { useState } from 'react';
import { Input } from '@material-ui/core'

function ProductImage(props) {
  const { image, setProducImage } = props

  const [selectedFile, setSelectedFile] = useState({})

  function fileChangeHandler(event){
    console.log(event.target.files[0])
    setSelectedFile(event.target.files[0])
    console.log(typeof selectedFile)
  }

  return (
    <div>
      <Input type="file" name="file" onChange={fileChangeHandler}/>
      {JSON.stringify(selectedFile,null,2)}
    </div>
  )
}

export default ProductImage
