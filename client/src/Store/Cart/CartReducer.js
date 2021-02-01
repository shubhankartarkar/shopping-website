import { INCREMENT_ITEM, DECREMENT_ITEM, SETCART_COUNT} from './CartTypes'

const initialState = {
  count: 0
}

function CartReducer(state = initialState, action){
  switch(action.type){
    case INCREMENT_ITEM:
      return {
        ...state,
        count: state.count + 1
      }
    
    case DECREMENT_ITEM:
      return {
        ...state,
        count: state.count - 1
      }
    
    case SETCART_COUNT:
      return {
        ...state,
        count: action.payload
      }
    
    default:
        return state
  }
}

export default CartReducer