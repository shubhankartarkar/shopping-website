import axios from 'axios'
import { FETCH_CATEGORY_REQUEST, FETCH_CATEGORY_SUCCESS, FETCH_CATEGORY_ERROR, ADD_EDIT_CATEGORY_REQUEST, ADD_EDIT_CATEGORY_SUCCESS, ADD_EDIT_CATEGORY_ERROR } from './CategoryTypes'
import { SERVER_URL } from '../../../globalConstants'

function fetchCategoryRequest(){
  return {
    type: FETCH_CATEGORY_REQUEST
  }
}

function fetchCategorySuccess(data){
  return {
    type: FETCH_CATEGORY_SUCCESS,
    payload: data
  }
}

function fetchCategoryError(error){
  return {
    type: FETCH_CATEGORY_ERROR,
    payload: error
  }
}

function fetchCategory(){
  return(dispatch) => {
    dispatch(fetchCategoryRequest())
    return axios.get(`${SERVER_URL}/api/category`)
      .then(res => {
        console.log(res)
        dispatch(fetchCategorySuccess(res.data))
      })
      .catch(err => {
        dispatch(fetchCategoryError(err))
      })
  }
}

function addEditCategoryRequest(){
  return {
    type: ADD_EDIT_CATEGORY_REQUEST
  }
}

function addEditCategorySuccess(data){
  return {
    type: ADD_EDIT_CATEGORY_SUCCESS,
    payload: data
  }
}

function addEditCategoryError(err){
  return {
    type: ADD_EDIT_CATEGORY_ERROR,
    payload: err
  }  
}

function addEditCategory(categoryData){
  return (dispatch) => {
    dispatch(addEditCategoryRequest())
    return axios.post(`${SERVER_URL}/api/category`,categoryData)
      .then(res => {
        dispatch(addEditCategorySuccess(res.data))
      })
      .catch(err => {
        dispatch(addEditCategoryError(err))
      })
  }
}

export { fetchCategory, addEditCategory }
