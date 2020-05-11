import {apiGetListUsers} from "api/user";
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
export const setShowedAdd = (value) =>  dispatch => {
    dispatch(userReducer.setShowedAdd(value))
};







