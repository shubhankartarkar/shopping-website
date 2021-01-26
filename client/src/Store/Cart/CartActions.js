import { INCREMENT_ITEM, DECREMENT_ITEM } from './CartTypes';

function incrementItem(){
  return {
    type: INCREMENT_ITEM
  }
}

function decrementItem(){
  return {
    type: DECREMENT_ITEM
  }
}

export { incrementItem, decrementItem }

