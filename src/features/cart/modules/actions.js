import {cartReducer} from "../index";
import {apiPay, apiSendTicketEmail, apiSendTicketWhatsApp} from "api/product";

export const addToCart = (product) => dispatch => {
    dispatch(cartReducer.addProduct(product))
}
export const removeOne = (product) => dispatch => {
    dispatch(cartReducer.removeOne(product))
}
export const removeProduct = (id) => dispatch => {
    dispatch(cartReducer.removeProduct(id))
}
export const clearCart = () => dispatch => {
    dispatch(cartReducer.clearCart())
}
export const editProduct = (product) => dispatch => {
    dispatch(cartReducer.editProduct(product))
}
export const pay = (data) => async dispatch => {
    try {
        dispatch(cartReducer.setIsLoadingPayment(true))
        dispatch(cartReducer.setCurrentPayment(data))
        let res = await apiPay(data);
    } catch (e){
        console.log(e)
        throw new Error(e)
    } finally {
        dispatch(cartReducer.setIsLoadingPayment(false))
    }
};
export const sendTicketEmail = (data) => async dispatch => {
    try {
        let res = await apiSendTicketEmail(data);
    } catch (e){
        console.log(e)
        throw new Error(e)
    }
};
export const sendTicketWhatsApp = (data) => async dispatch => {
    try {
        let res = await apiSendTicketWhatsApp(data);
    } catch (e){
        console.log(e)
        throw new Error(e)
    }
};

