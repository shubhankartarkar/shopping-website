import { INCREMENT_ITEM, DECREMENT_ITEM} from './CartTypes'

const initialState = {
  count: 0
}

function CartReducer(state = initialState, action){
  switch(action.type){
    case INCREMENT_ITEM:
      return state.count++
    
    case DECREMENT_ITEM:
      return state.count--
  }
}

export default CartReducer