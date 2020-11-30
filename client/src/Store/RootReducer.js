import ProductReducer from './Product/ProductReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  products: ProductReducer
});

export default rootReducer