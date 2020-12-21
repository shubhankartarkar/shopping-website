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
      let newProduct = [], productIndex = 0;
      productIndex = action.payload[0].id - 1
      if(productIndex >= 0){
        if(state.products[productIndex] === undefined){
          newProduct = [...state.products, ...action.payload]
        } else {
          newProduct = [...state.products.slice(0, productIndex), ...action.payload, ...state.products.slice(productIndex + 1)]
        }
      }
    
      return {
        ...state,
        products: newProduct,
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