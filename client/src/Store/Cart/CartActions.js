import { INCREMENT_ITEM, DECREMENT_ITEM, SETCART_COUNT } from './CartTypes';

function incrementItem(){
  console.log('Increment Item Called')
  return {
    type: INCREMENT_ITEM
  }
}

function decrementItem(){
  return {
    type: DECREMENT_ITEM
  }
}
function setCartCount(count){
 return {
    type: SETCART_COUNT,
    payload: count
  }
}

export { incrementItem, decrementItem, setCartCount }

