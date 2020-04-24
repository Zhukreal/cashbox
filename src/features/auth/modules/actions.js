import {apiLogin, apiLogout } from '../../../api/account'
import {authReducer} from "../../auth";
import {profileReducer} from "../../profile";
import {history} from "../../../lib/routing";

export const login = credentials => async dispatch => {
    try {
        dispatch(authReducer.setIsLoading(true))
        let res = await apiLogin(credentials);
        dispatch(authReducer.setIsLoading(false))
        dispatch(profileReducer.setProfile(res))
    } catch (e){
        console.log(e)
        dispatch(authReducer.setIsLoading(false))
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