import { FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS, FETCH_PRODUCT_ERROR, ADD_EDIT_PRODUCT_REQUEST, ADD_EDIT_PRODUCT_SUCCESS, ADD_EDIT_PRODUCT_ERROR } from './ProductTypes';

const initialState = {
  loading: true,
  products: [],
  error: '',
  saving: false
}

function ProductReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true
      }

    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...action.payload]
      }

    case FETCH_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        products: [],
        error: action.payload
      }

    case ADD_EDIT_PRODUCT_REQUEST:
      return {
        ...state,
        saving: true
      }

    case ADD_EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [...state.products, action.payload],
        saving: false
      }

    case ADD_EDIT_PRODUCT_ERROR:
      return {
        ...state,
        saving: false,
        error: action.payload
      }
    default:
      return state
  }
}

export default ProductReducer