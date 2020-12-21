import axios from 'axios';
import { SERVER_URL } from '../../globalConstants';
import { ADD_ITEM_REQUEST, ADD_ITEM_SUCCESS, ADD_ITEM_ERROR, REMOVE_ITEM_REQUEST, REMOVE_ITEM_SUCCESS, REMOVE_ITEM_ERROR,
  INCREMENT_ITEM, DECREMENT_ITEM} from './CartTypes';

function addItemRequest(){
  return {
    type: ADD_ITEM_REQUEST
  }
}

function addItemSuccess(data){
  return {
    type: ADD_ITEM_SUCCESS,
    payload: data
  }
}

function addItemError(error){
  return {
    type: ADD_ITEM_ERROR,
    payload: error
  }
}

function addItem(productId){
  return (dispatch) => {
    dispatch(addItemRequest())
    return axios.post(`${SERVER_URL}/api/cart/addItem`,{productId})
      .then(res => {
        addItemSuccess(res.data)
      })
      .catch(err => {
        addItemError(err)
      })
  }
}

export { addItem }