import axios from "axios";
import {API_URL} from 'lib/CONST'

export const apiGetListUsers = ({ search = '' })  => {
    return axios.get(`${API_URL}/api/v1/customers?search=${search}`)
}
