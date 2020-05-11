import {cartReducer} from "../index";

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
