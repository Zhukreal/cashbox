import {offersReducer} from '../index'
import {apiGetListOffers, apiGetOffer} from "../../../api/offers";

export const getOffers = (skip, take) => async dispatch => {
    try {
        dispatch(offersReducer.setLoading(true))
        let data = await apiGetListOffers({skip, take});
        dispatch(offersReducer.setOffers(data))
    } catch (e){
        console.log(e)
    } finally {
        dispatch(offersReducer.setLoading(false))
    }
};

export const getOffersByFilter = (search) => async dispatch => {
    try {
        let data = await apiGetListOffers({search});
        dispatch(offersReducer.setFilteredOffers(data))
    } catch (e){
        console.log(e)
    } finally {
        // dispatch(offersReducer.setLoading(false))
    }
};

export const getOfferById = (id) => async dispatch => {
    try {
        // dispatch(offersReducer.setLoading(true))
        let res = await apiGetOffer(id);
        dispatch(offersReducer.setOffer(res.data))
    } catch (e){
        console.log(e)
    } finally {
        dispatch(offersReducer.setLoading(false))
    }
};
