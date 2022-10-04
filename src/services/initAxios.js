import axios from 'axios';

class InitAxios {
    constructor(path) {
        this.axios = axios.create({
            baseURL: `${process.env.REACT_APP_BASE_URL}${path}`
        })

        this.axios.interceptors.request.use((config) => {
            const token = localStorage.getItem('tokenAuth')

            // if (token) {
            //     config.headers = {
            //         'authorization': `Bearer ${token}`
            //     }
            // }
            return config
        })
    }
}

export default InitAxios;