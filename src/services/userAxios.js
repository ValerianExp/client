import InitAxios from './initAxios';


class UserAxios extends InitAxios {
    constructor() {
        super('/user');
    }

    me() {
        return this.axios.get('/me').then((response) => response.data);
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new UserAxios();
        }
        return this.instance;
    }

}

export default UserAxios.getInstance();