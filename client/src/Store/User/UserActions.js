import { USER_lOGGED_IN, USER_lOGGED_OUT } from './UserTypes'

function loginUser(data) {
  let user = {
    token: data.token,
    id: data.user.id,
    name: data.user.name
  }

  return {
    type: USER_lOGGED_IN,
    payload: user
  }
}

function logoutUser() {
  return {
    type: USER_lOGGED_OUT
  }
}

export { loginUser, logoutUser}