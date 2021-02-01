import { USER_lOGGED_IN, USER_lOGGED_OUT } from './UserTypes'

function loginUser(data) {
  let user = {
    token: data.token,
    id: data.user[0][0].id,
    name: data.user[0][0].name
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