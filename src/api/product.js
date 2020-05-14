import axios from "axios";
import {API_URL} from 'lib/CONST'

export const apiGetListProducts = ({search = '', skip = 0, take = 16, ordering = 'name', group = ''})  => {
    return axios.get(`${API_URL}/api/v1/catalog/products/?format=table&show_rest=true&search=${search}&offset=${skip}&limit=${take}&ordering=${ordering}&group=${group}`)
}
export const apiGetListGroups = ()  => {
    return axios.get(`${API_URL}/api/v1/catalog/groups?children=true&ordering=popularity`)
}
export const apiGetListSections = (id)  => {
    return axios.get(`${API_URL}/api/v1/stores/${id}/get_sections/`)
}
export const apiCheckCashStatus = (id) => {
    // return axios.get(`${API_URL}/api/v1/cashes/${id}/stats/`)
    return axios.get(`${API_URL}/api/v1/current_shift/ `)
}
export const apiPay = (data) => {
    return axios.post(`${API_URL}/api/v1/operations/`, data)
}
export const apiSendTicketEmail = () => {
    return axios.post(`${API_URL}/api/v1/product_orders/{id}/send_ticket_email/`)
}
export const apiSendTicketWhatsApp = () => {
    return axios.post(`${API_URL}/api/v1/product_orders/{id}/send_ticket_watsapp/`)
}


