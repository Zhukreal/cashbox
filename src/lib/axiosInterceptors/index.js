import axios from 'axios';
import {AUTHTOKEN} from 'lib/CONST'
import {store} from 'lib/store/store'
import {authActions} from "features/auth";

axios.interceptors.request.use(function(config) {
    const token = localStorage.getItem(AUTHTOKEN);
    if ( token != null ) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        config.headers.Authorization = 'Basic YzdTRjlRVHVLYzAyTVQ1ZjczcktlaVlydUdJck1mV3FRdHg0Nnd4ajpyQVhLVER4UVIwdjZybG5vVmFqeWZrMXlVcVN2REZ2bW9SUU9sRVBCdGs3aVI5eW9ENlNQcERpdVFpSFVlT0dRRU5ZS0NkMXNVTHRSWHNXdkhscFVnYXdjRjVVeklJV0dpcjlMb2JpckJDcEpldnhlcWVzSFY0c0JVY25yTDVkaA=='
    }

    return config;
}, function(err) {
    return Promise.reject(err);
});

axios.interceptors.response.use(
    async (response) => { return response },
    async (error) => {
        const status = error.response.status
        if (status === 401) {
            console.log(store)
            store.dispatch(authActions.logout())
        }
        if (status === 403) {
            // window.location.href='/'
        }
        return Promise.reject(error)
    })