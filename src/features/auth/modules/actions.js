import Cookies from "browser-cookies"
import {apiLogin, apiLogout, apiGetAccount } from 'api/account'
import {authReducer} from "features/auth";
import {profileReducer} from "features/profile";
import {history} from "lib/routing";
import {AUTHTOKEN} from "lib/CONST"


export const login = credentials => async dispatch => {
    try {
        dispatch(authReducer.setIsLoading(true))
        let res = await apiLogin(credentials);
        Cookies.set(AUTHTOKEN, '123')
        let profile = await apiGetAccount();
        dispatch(profileReducer.setProfile(profile))
        dispatch(authReducer.setIsLoading(false))

    } catch (e){
        dispatch(authReducer.setIsLoading(false))
        throw new Error(e)
    }
};

export const logout = () => async dispatch => {
    try {
        await apiLogout();
        dispatch(profileReducer.clearProfile())
        history.push('/login');
    } catch (e){
        console.log(e)
    }
};

export const setExpiredSession = flag => async dispatch => {
    try {
        dispatch(authReducer.setExpiredSession(flag))
    } catch (e){

    }
};