import { FETCH_CATEGORY_REQUEST, FETCH_CATEGORY_SUCCESS, FETCH_CATEGORY_ERROR, ADD_EDIT_CATEGORY_REQUEST, ADD_EDIT_CATEGORY_SUCCESS, ADD_EDIT_CATEGORY_ERROR } from './CategoryTypes';

const initialState = {
  loading:true,
  categories:[],
  error:'',
  saving:false
}

function CategoryReducer(state = initialState, action){
   switch(action.type){
    case FETCH_CATEGORY_REQUEST: 
      return {
        ...state,
        loading:true
      }

    case FETCH_CATEGORY_SUCCESS: 
      return {
        ...state,
        loading:false,
        categories: [...action.payload]
      }
    
    case FETCH_CATEGORY_ERROR:
      return {
        ...state,
        loading: false,
        categories:[],
        error: action.payload
      }
    
    case ADD_EDIT_CATEGORY_REQUEST:
      return {
        ...state,
        saving:true
      }
    
    case ADD_EDIT_CATEGORY_SUCCESS:
      return {
        ...state,
        categories:[...state.categories, action.payload],
        saving:false
      }
    
    case ADD_EDIT_CATEGORY_ERROR:
      return {
        ...state,
        saving:false,
        error:action.payload
      }

    default:
      return state
  }
}

export default CategoryReducer