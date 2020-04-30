import axios from "axios";
import {API_URL} from 'lib/CONST'

export const apiGetListProducts = ({skip = 0, take = 16, search = ''})  => {
    return axios.get(`${API_URL}/api/v1/catalog/products/?limit=${skip}&offset=${take}`)
}

