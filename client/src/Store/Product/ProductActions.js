import axios from 'axios';
import { FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_ERROR } from './ProductTypes';
import { SERVER_URL } from '../../globalConstants'

function fetchProductRequest(){
  return {
    type: FETCH_PRODUCTS_REQUEST
  }
}

function fetchProductSuccess(data){
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: data
  }
}

function fetchProductError(error){
  return {
    type: FETCH_PRODUCTS_ERROR,
    payload: error
  }
}

function fetchProducts(){
  return (dispatch) => {
    dispatch(fetchProductRequest())
    axios.get(`${SERVER_URL}/api/product`)
    .then(res => {
      dispatch(fetchProductSuccess(res.data))
    })
    .catch(err => {
      dispatch(fetchProductError(err))
    })
  }
}

export { fetchProducts }