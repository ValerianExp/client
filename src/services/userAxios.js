import InitAxios from './initAxios';


class UserAxios extends InitAxios {
    constructor() {
        super('/user');
    }

    me() {
        return this.axios.get('/me').then((response) => response.data);
    }

    editUser(body) {
        console.log('body->', body._id);
        return this.axios.put(`/${body.get('_id')}`, body).then((response) => response.data)
    }

    deleteUser(userId) {
        return this.axios.delete(`/${userId}`).then((response) => response.data);
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new UserAxios();
        }
        return this.instance;
    }

}

export default UserAxios.getInstance();