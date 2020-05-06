import {productReducer} from '../index'
import {apiGetListProducts, apiGetListGroups, apiCheckCashStatus, apiGetListSections} from "api/product";
import {store} from 'lib/store/store'

export const getProducts = (obj) => async dispatch => {
    try {
        // const { product } = store.getState()
        dispatch(productReducer.setLoading(true))
        let res = await apiGetListProducts(obj);
        dispatch(productReducer.setProducts(res.data))
    } catch (e){
        console.log(e)
    } finally {
        dispatch(productReducer.setLoading(false))
    }
};

export const getProductsMore = (obj) => async dispatch => {
    try {
        // const { product } = store.getState()
        // console.log('product', product)
        let res = await apiGetListProducts(obj);
        dispatch(productReducer.setMoreProducts(res.data))
    } catch (e){
        console.log(e)
    } finally {

    }
};
export const setSearch = (str) => async dispatch => {
    dispatch(productReducer.setSearchFilter(str))
}

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






