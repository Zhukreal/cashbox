import axios from "axios";
import {API_URL} from 'lib/CONST'

export const apiGetListProducts = ({search = '', skip = 0, take = 16})  => {
    return axios.get(`${API_URL}/api/v1/catalog/products/?format=table&show_rest=true&search=${search}&offset=${skip}&limit=${take}`)
}
export const apiGetListGroups = ()  => {
    return axios.get(`${API_URL}/api/v1/catalog/groups?children=true&ordering=popularity`)
}
export const apiGetListSections = (id)  => {
    return axios.get(`${API_URL}/api/v1/stores/${id}/get_sections/`)
}
export const apiCheckCashStatus = (id) => {
    return axios.get(`${API_URL}/api/v1/cashes/${id}/stats/`)
}

