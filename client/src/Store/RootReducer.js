import ProductReducer from './Product/ProductReducer';
import CategoryReducer from './Admin/Category/CategoryReducer';
import AdminProductReducer from './Admin/Product/ProductReducer';
import UserReducer from './User/UserReducer'
import CartReducer from './Cart/CartReducer'
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  products: ProductReducer,
  categories: CategoryReducer,
  adminProduct: AdminProductReducer,
  user:UserReducer,
  cart: CartReducer
});

export default rootReducer