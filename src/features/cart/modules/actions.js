import { v4 as uuidv4 } from 'uuid'
import { showNotification } from 'lib/notification'
import { apiPay, apiSendTicketEmail, apiSendTicketWhatsApp } from 'api/product'
import { cartReducer } from '../index'
import { store } from 'lib/store/store'

export const addToCart = (product) => (dispatch) => {
  dispatch(cartReducer.addProduct(product))
}
export const removeOne = (product) => (dispatch) => {
  dispatch(cartReducer.removeOne(product))
}
export const removeProduct = (id) => (dispatch) => {
  dispatch(cartReducer.removeProduct(id))
}
export const clearCart = () => (dispatch) => {
  dispatch(cartReducer.clearCart())
}
export const editProduct = (product) => (dispatch) => {
  dispatch(cartReducer.editProduct(product))
}
export const pay = (data) => async (dispatch) => {
  try {
    const { product } = store.getState()
    const receiptWidth = 57
    const activeSection =
      product.activeSection && product.activeSection.id
        ? product.activeSection.id
        : null
    const items = data.products.map((product) => {
      return {
        total_price: product.currentPrice,
        name: product.name,
        base_price: product.price,
        amount: product.count,
        discount: product.totalDiscount || 0,
        section: activeSection,
        // product: product.id,
      }
    })
    const payments = []
    if (data.typePayment === 'cash') {
      payments.push({
        payment_type: 'CASH',
        sum: data.total,
      })
    } else {
      payments.push({
        payment_type: 'CARD',
        sum: Number(data.card),
      })
      if (data.cash) {
        payments.push({
          payment_type: 'CASH',
          sum: Number(data.cash),
        })
      }
    }

    const change_sum = data.accepted - data.total

    const obj = {
      request_id: uuidv4(),
      ticket_type: data.ticketType,
      cash: localStorage.getItem('cashbox'),
      total_sum: data.total,
      taken_sum: data.accepted,
      change_sum: change_sum > 0 ? change_sum : 0,
      items: items,
      payments: payments,
      comment: data.comment,
      customer: data.customer
    }

    if(!obj.customer) delete obj.customer

    dispatch(cartReducer.setIsLoadingPayment(true))
    dispatch(cartReducer.setCurrentPayment(data))
    let res = await apiPay(obj, receiptWidth)
    dispatch(cartReducer.setCurrentReceipt(res.data))
  } catch (e) {
    showNotification('error', e)
    throw new Error(e)
  } finally {
    dispatch(cartReducer.setIsLoadingPayment(false))
  }
}
export const sendTicketEmail = (id, email) => async (dispatch) => {
  try {
    let res = await apiSendTicketEmail(id, {email: email})
    showNotification('info', `Чек был отправлен на ${email}`)
  } catch (e) {
    showNotification('error', e)
    throw new Error(e)
  }
}
export const sendTicketWhatsApp = (id) => async (dispatch) => {
  try {
    let res = await apiSendTicketWhatsApp(id)
  } catch (e) {
    showNotification('error', e)
    throw new Error(e)
  }
}
