import {apiGetAccount} from '../../../api/account'
import {profileReducer} from '../index'

export const getAccount = token => async dispatch => {
    try {
        let data = await apiGetAccount(token);
        dispatch(profileReducer.setProfile(data))
    } catch (e){
        console.log(e)
    }
};

