import axios from 'axios'
import {API_URL} from 'lib/CONST'

export const apiLogin = data => {
     return axios.post(`${API_URL}/api/v1/auth/token/`, data)
}

export const apiLogout = () => {
    return  null
}

export const apiGetAccount = () => {
   return axios.get(`${API_URL}/api/v1/current_user/`)
}
export const apiCheckConnection = () => {
    return axios.head(`${API_URL}/api/v1/current_user/`)
}



