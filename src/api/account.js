import axios from 'axios'

export const apiLogin = data => {
    return new Promise(function(resolve) {
        const data =  {
            token: '123',
            id: '2',
            firstName: 'Yury2',
            lastName: 'Zhuk2'
        }
        setTimeout(() => resolve(data), 3000);
    });

    // return axios.post("/account/login", data)
}

export const apiLogout = data => {
    return  null
}

export const apiGetAccount = token => {
    return {
        id: '2',
        firstName: 'Yury2',
        lastName: 'Zhuk2'
    }

   // return axios.get("/account", token)
}


