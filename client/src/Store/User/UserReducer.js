import { USER_lOGGED_IN, USER_lOGGED_OUT } from './UserTypes';

const initialState = {
  token: '',
  name: '',
  loggedIn: false,
  id: 0,
  userType:'U'
}

function UserReducer(state = initialState, action){
  switch(action.type){
    case USER_lOGGED_IN:
      const { token = '', name = '', id  = '', userType = 'U'} = action.payload
      return {
        ...state,
          token,
          name,
          id,
          loggedIn: true,
          userType
      }

      case USER_lOGGED_OUT: 
        return initialState
      
      default: 
        return state  
  }
}

export default UserReducer