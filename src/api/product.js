import axios from "axios";
import {API_URL} from 'lib/CONST'

export const apiGetListProducts = ({skip = 0, take = 16, search = ''})  => {
    return axios.get(`${API_URL}/api/v1/catalog/products/?format=table&limit=${skip}&offset=${take}`)
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

// "619849a7-9296-49fd-9f9c-6c97449c2d73"
// "6a8d7f53-9163-4d72-84da-93f4f2e7d00d"