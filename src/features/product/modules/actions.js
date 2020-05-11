import {productReducer} from '../index'
import {apiGetListProducts, apiGetListGroups, apiCheckCashStatus, apiGetListSections} from "api/product";
import {store} from 'lib/store/store'

export const getProducts = ({ isMore }) => async dispatch => {
    try {
        const { product } = store.getState()
        const obj = {
            search: product.searchFilter,
            skip: product.skip,
            take: product.take,
            ordering: product.activeSorting,
            group: product.activeGroup.id
        }
        if(!isMore) dispatch(productReducer.setLoading(true))
        let res = await apiGetListProducts(obj);
        if(isMore) {
            dispatch(productReducer.setMoreProducts(res.data))
        } else {
            dispatch(productReducer.setProducts(res.data))
        }

    } catch (e){
        console.log(e)
    } finally {
        dispatch(productReducer.setLoading(false))
    }
};

export const getProductsMore = () => async dispatch => {
    try {
        const { product } = store.getState()
        // console.log('product', product)
        const obj = {
            search: product.searchFilter,
            skip: product.skip,
            take: product.take
        }
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
        dispatch(productReducer.setCashStatus(res.data))
    } catch (e){
        console.log(e)
    } finally {

    }
};

export const getSections = () => async dispatch => {
    try {
        const CASHBOX = localStorage.getItem('cashbox')
        const STORE = localStorage.getItem('store')

        let res = await apiGetListSections(STORE);
        dispatch(productReducer.setSections(res.data))
    } catch (e){
        console.log(e)
    } finally {

    }
}
export const setSection = (section) => dispatch => {
    dispatch(productReducer.setSection(section))
}
export const setGroup = (group) => dispatch => {
    dispatch(productReducer.setGroup(group))
}
export const setSorting = (sort) => dispatch => {
    localStorage.setItem('activeSorting', sort)
    dispatch(productReducer.setSorting(sort))
}
export const resetFilters = () => dispatch => {
    dispatch(productReducer.resetFilters())
}
export const setBlur = (value) => dispatch => {
    dispatch(productReducer.setBlur(value))
}




