import axios from 'axios'
import { API_URL } from 'lib/CONST'

export const apiLogin = (data) => {
  return axios.post(`${API_URL}/api/v1/auth/token/`, data)
}
export const apiGetAccount = () => {
  return axios.get(`${API_URL}/api/v1/current_user/`)
}
export const apiChangePassword = (data) => {
  return axios.put(`${API_URL}/api/v1/current_user/password/`, data)
}
export const apiCheckConnection = () => {
  return axios.head(`${API_URL}/api/v1/current_user/`)
}
export const apiCloseShift = () => {
  return axios.delete(`${API_URL}/api/v1/current_shift/`)
}
export const apiLoadCurrentReport = (cashId) => {
  return axios.get(`${API_URL}/api/v1/cashes/${cashId}/zxreport/`)
}
export const apiCloseLastProcedure = () => {
  return axios.delete(`${API_URL}/api/v1/product_order/`)
}
export const apiCheckCashStatus = (id) => {
  return axios.get(`${API_URL}/api/v1/current_shift/`)
}
export const apiAddCashToKassa = (data) => {
  return axios.post(`${API_URL}/api/v1/cash/deposit/`, data)
}
export const apiRemoveCashFromKassa = (data) => {
  return axios.post(`${API_URL}/api/v1/cash/withdrawals/`, data)
}
export const apiGetInfoKassa = (id) => {
  return axios.get(`${API_URL}/api/v1/cash/${id}/stats/`)
}
