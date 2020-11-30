import { FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_ERROR } from './ProductTypes';

const initialState = {
  loading: true,
  products: [],
  error: ''
}

function productReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...action.payload]
    }

    case FETCH_PRODUCTS_ERROR:
      return {
        loading: false,
        products: [],
        error: action.payload
      }
    
      default : 
        return state
  }
}

export default productReducer