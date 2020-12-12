import axios from 'axios'
import { SERVER_URL } from '../../../globalConstants'
import {
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_ERROR,
  ADD_EDIT_PRODUCT_REQUEST,
  ADD_EDIT_PRODUCT_SUCCESS,
  ADD_EDIT_PRODUCT_ERROR
} from './ProductTypes'

function fetchProductRequest(){
  return {
    type: FETCH_PRODUCT_REQUEST
  }
}

function fetchProductSuccess(data){
  return {
    type: FETCH_PRODUCT_SUCCESS,
    payload: data
  }
}

function fetchProductError(error){
  return {
    type: FETCH_PRODUCT_ERROR,
    payload: error
  }
}

function fetchProduct(){
  return (dispatch) => {
    dispatch(fetchProductRequest())
    return axios.get(`${SERVER_URL}/api/prodcuts`)
      .then(res => {
        dispatch(fetchProductSuccess(res.dat))
      })
      .catch(error => {
        dispatch(fetchProductError(error))
      })
  }
}

function addEditProductRequest(){
  return {
    type: ADD_EDIT_PRODUCT_REQUEST
  }
}


function addEditProductSuccess(data){
  return {
    type: ADD_EDIT_PRODUCT_SUCCESS,
    payload:data
  }
}

function addEditProductError(error){
  return {
    type: ADD_EDIT_PRODUCT_ERROR,
    payload:error
  }
}

function addEditCategory(productData){
  return (dispatch) => {
    dispatch(addEditProductRequest())
    return axios.post(`${SERVER_URL}/api/category`,productData)
      .then(res => {
        dispatch(addEditProductSuccess(res.data))
      })
      .catch(error => {
        dispatch(addEditProductError(error))
      })
  }
}

export { fetchProduct, addEditCategory }
