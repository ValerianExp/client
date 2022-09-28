import axios from 'axios';

class InitAxios {
    constructor(path) {
        this.axios = axios.create({
            baseURL: `${process.env.REACT_APP_BASE_URL}${path}`
        })
    }
}

export default InitAxios;