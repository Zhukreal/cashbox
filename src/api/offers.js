import axios from "axios";

export const apiGetListOffers = ({skip = 0, take = 20, search = ''})  => {
    return axios.get(`https://talentbooking.net/api/v1/client/offer?skip=${skip}&take=${take}&search=${search}`)
}

export const apiGetOffer = (id)  => {
    return axios.get(`https://talentbooking.net/api/v1//offer/${id}`)
}
