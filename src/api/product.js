import axios from 'axios'
import { API_URL } from 'lib/CONST'

export const apiGetListProducts = ({
  search = '',
  skip = 0,
  take = 16,
  ordering = 'name',
  group = '',
}) => {
  return axios.get(
    `${API_URL}/api/v1/catalog/products/?format=table&show_rest=true&search=${search}&offset=${skip}&limit=${take}&ordering=${ordering}&group=${group}`,
  )
}
export const apiGetListGroups = () => {
  return axios.get(
    `${API_URL}/api/v1/catalog/groups?children=true&ordering=popularity`,
  )
}
export const apiGetListSections = (id) => {
  return axios.get(`${API_URL}/api/v1/stores/${id}/get_sections/`)
}
export const apiPay = (data, receiptWidth) => {
  return axios.post(
    `${API_URL}/api/v1/operations/?receipt_width=${receiptWidth}`,
    data,
  )
}
export const apiSendTicketEmail = (id) => {
  return axios.post(`${API_URL}/api/v1/product_orders/${id}/send_ticket_email/`)
}
export const apiSendTicketWhatsApp = (id) => {
  return axios.post(
    `${API_URL}/api/v1/product_orders/${id}/send_ticket_whatsapp/`,
  )
}
