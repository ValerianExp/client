
class TripAxios {
    constructor() {
        super('/trip')
    }

    newtrip(body) {
        return this.axios.post('/all', body).then((response) => response.data)
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new TripAxios();
        }
        return this.instance;
    }

}

export default TripAxios.getInstance()