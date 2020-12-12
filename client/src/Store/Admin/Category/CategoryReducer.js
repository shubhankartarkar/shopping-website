import { FETCH_CATEGORY_REQUEST, FETCH_CATEGORY_SUCCESS, FETCH_CATEGORY_ERROR, ADD_EDIT_CATEGORY_REQUEST, ADD_EDIT_CATEGORY_SUCCESS, ADD_EDIT_CATEGORY_ERROR } from './CategoryTypes';

const initialState = {
  loading:true,
  categories:[{
    categoryId:1,
    categoryName: 'Monitor',
  }],
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
      let newCategory = [], categoryIndex = 0;
      categoryIndex = action.payload[0].categoryId - 1;
      if(categoryIndex >= 0){
        if(state.categories[categoryIndex] === undefined){
          newCategory = [...state.categories, ...action.payload]
        } else {
          newCategory = [...state.categories.slice(0, categoryIndex), ...action.payload,...state.categories.slice(categoryIndex + 1)]
        }
      }
      
      return {
        ...state,
        categories: newCategory,
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