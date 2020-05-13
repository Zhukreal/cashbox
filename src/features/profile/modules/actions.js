import {apiGetAccount, apiCloseShift, apiLoadCurrentReport, apiCloseLastProcedure} from 'api/account'
import {profileReducer} from 'features/profile'

export const getAccount = token => async dispatch => {
    try {
        let profile = await apiGetAccount(token);
        dispatch(profileReducer.setProfile(profile.data))
    } catch (e){
        console.log(e)
    }
};

export const closeShift = () => async dispatch => {
    try {
        dispatch(profileReducer.setIsLoadingCloseShift(true))
        let res = await apiCloseShift();
    } catch (e){
        throw new Error(e)
    } finally {
        dispatch(profileReducer.setIsLoadingCloseShift(false))
    }
};

export const loadCurrentReport = () => async dispatch => {
    try {
        dispatch(profileReducer.setIsLoadingReport(true))
        const cashId = localStorage.getItem('cashbox')
        let res = await apiLoadCurrentReport(cashId);
        dispatch(profileReducer.setCurrentReport(res.data))
    } catch (e){
        console.log(e)
        throw new Error(e)
    } finally {
        dispatch(profileReducer.setIsLoadingReport(false))
    }
};
export const closeLastProcedure = () => async dispatch => {
    try {
        dispatch(profileReducer.setIsLoadingCloseShift(true))
        let res = await apiCloseLastProcedure();
    } catch (e){
        throw new Error(e)
    } finally {
        dispatch(profileReducer.setIsLoadingCloseShift(false))
    }
};



