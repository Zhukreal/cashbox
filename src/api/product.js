import axios from "axios";

export const apiGetListProducts = ({skip = 0, take = 16, search = ''})  => {
    return axios.get(`https://talentbooking.net/api/v1/client/offer?skip=${skip}&take=${take}&search=${search}`)
}

