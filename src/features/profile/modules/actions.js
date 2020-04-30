import {apiGetAccount} from '../../../api/account'
import {profileReducer} from '../index'

export const getAccount = token => async dispatch => {
    try {
        let profile = await apiGetAccount(token);
        dispatch(profileReducer.setProfile(profile.data))
    } catch (e){
        console.log(e)
    }
};



