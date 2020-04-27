import {productReducer} from '../index'
import {apiGetListProducts} from "api/product";

export const getProducts = (skip, take) => async dispatch => {
    try {
        dispatch(productReducer.setLoading(true))
        let data = await apiGetListProducts({skip, take});
        dispatch(productReducer.setProducts(data))
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
        // dispatch(offersReducer.setLoading(false))
    }
};

