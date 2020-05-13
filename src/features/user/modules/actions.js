import {apiGetListUsers, apiAddNewUser} from "api/user";
import {formatDate} from  'lib/modifyData/formatDate'
import {userReducer} from '../index'

export const getUsers = (search) => async dispatch => {
    try {
        dispatch(userReducer.setLoadingList(true))
        dispatch(userReducer.setSearch(search))
        let res = await apiGetListUsers({search: search});
        dispatch(userReducer.setUsers(res.data))
    } catch (e){
        console.log(e)
    } finally {
        dispatch(userReducer.setLoadingList(false))
    }
};
export const setSearch = (value) =>  dispatch => {
    dispatch(userReducer.setSearch(value))
};
export const setShowedAdd = (value) =>  dispatch => {
    dispatch(userReducer.setShowedAdd(value))
};
export const addNewUser = (user) => async dispatch => {
    try {
        dispatch(userReducer.setLoadingAddNew(true))

        if(user.birth_date) {
            user.birth_date = formatDate(user.birth_date)
        } else {
            delete user.birth_date
        }
        if(!user.email) delete user.email
        if(!user.gender) delete user.gender
        await apiAddNewUser(user);
        dispatch(userReducer.setShowedAdd(false))
    } catch (e){
        console.log(e)
        throw new Error(e)
    } finally {
        dispatch(userReducer.setLoadingAddNew(false))
    }
};
export const setClient = (client) =>  dispatch => {
    dispatch(userReducer.setClient(client))
};






