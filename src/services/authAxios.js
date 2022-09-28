import InitAxios from "./initAxios";

class AuthAxios extends InitAxios {
    constructor() {
        super('/auth')
    }

    signup(body) {
        return this.axios.post('/signup', body).then((response) => response.data)
    }

    login(body) {
        console.log(body)
        return this.axios.post('/login', body).then((response) => response.data)
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new AuthAxios();
        }
        console.log(this.instance);
        return this.instance;
    }
}

export default AuthAxios.getInstance()