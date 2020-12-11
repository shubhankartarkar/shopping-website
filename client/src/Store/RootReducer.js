import ProductReducer from './Product/ProductReducer';
import CategoryReducer from './Admin/Category/CategoryReducer';
import AdminProductReducer from './Admin/Product/ProductReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  products: ProductReducer,
  categories: CategoryReducer,
  adminProduct: AdminProductReducer
});

export default rootReducer