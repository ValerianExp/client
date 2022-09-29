import InitAxios from "./initAxios";

class TripAxios extends InitAxios {
    constructor() {
        super('/trip')
    }

    newtrip(body) {
        return this.axios.post('/new', body).then((response) => response.data)
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new TripAxios();
        }
        return this.instance;
    }

}

export default TripAxios.getInstance()