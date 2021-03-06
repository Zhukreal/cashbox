import { apiLogin } from 'api/account'
import { authReducer } from 'features/auth'
import { profileActions, profileReducer } from 'features/profile'
import { history } from 'lib/routing'
import { AUTHTOKEN } from 'lib/CONST'

export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(authReducer.setIsLoading(true))
    let res = await apiLogin(credentials)
    let token = res.data['access_token']
    if (token) {
      localStorage.setItem(AUTHTOKEN, token)
    }
    await dispatch(profileActions.getAccount())
    dispatch(authReducer.setIsLoading(false))
  } catch (e) {
    dispatch(authReducer.setIsLoading(false))
    throw new Error(e)
  }
}

export const logout = (isInterceptor) => async (dispatch) => {
  try {

    localStorage.removeItem(AUTHTOKEN)
    dispatch(profileReducer.clearProfile())

    if(isInterceptor) {
      history.push('/login');
    } else {
      window.location.href = '/login'
    }
  } catch (e) {
    console.log(e)
  }
}

export const setExpiredSession = (flag) => async (dispatch) => {
  dispatch(authReducer.setExpiredSession(flag))
}

export const setFailureConnection = (flag) => async (dispatch) => {
  dispatch(authReducer.setFailureConnection(flag))
}
