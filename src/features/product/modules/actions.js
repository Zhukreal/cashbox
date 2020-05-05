import {productReducer} from '../index'
import {apiGetListProducts, apiGetListGroups, apiCheckCashStatus, apiGetListSections} from "api/product";

export const getProducts = (skip, take) => async dispatch => {
    try {
        dispatch(productReducer.setLoading(true))
        let res = await apiGetListProducts({skip, take});
        dispatch(productReducer.setProducts(res.data))
    } catch (e){
        console.log(e)
    } finally {
        dispatch(productReducer.setLoading(false))
    }
};

export const getProductsByFilter = (search) => async dispatch => {
    try {
        let data = await apiGetListProducts({search});
        dispatch(productReducer.setFilteredProducts(data))
    } catch (e){
        console.log(e)
    } finally {

    }
};
export const getGroups = () => async dispatch => {
    try {
        let res = await apiGetListGroups();
        dispatch(productReducer.setGroups(res.data))
    } catch (e){
        console.log(e)
    } finally {
        dispatch(productReducer.setLoadingGroups(false))
    }
};

export const checkCashStatus = () => async dispatch => {
    try {
        const CASHBOX = localStorage.getItem('cashbox')
        let res = await apiCheckCashStatus(CASHBOX);

    } catch (e){
        console.log(e)
    } finally {
        dispatch(productReducer.setCashStatus(false))
    }
};

export const getSections = () => async dispatch => {
    try {
        const CASHBOX = localStorage.getItem('cashbox')
        let res = await apiGetListSections(CASHBOX);
        dispatch(productReducer.setSections(res.data))
    } catch (e){
        console.log(e)
    } finally {

    }
}






