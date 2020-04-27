import axios from 'axios'

export const apiLogin = data => {
    return new Promise(function(resolve) {
        const data =  {
            token: '123',
            id: '2',
            firstName: 'Cashbox',
            lastName: ''
        }
        setTimeout(() => resolve(data), 2000);
    });

    // return axios.post('/api/v1/auth/token/', data)
}

export const apiLogout = () => {
    return  null
}

export const apiGetAccount = () => {
    return new Promise(function(resolve) {
        const data =  {
            id: '2',
            firstName: 'Cashbox',
            lastName: '',
            cashes: [1,2,3,4,5,6]
        }
        setTimeout(() => resolve(data), 2000);
    });

   // return axios.get("/api/v1/current_user/")
}


