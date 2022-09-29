import InitAxios from "./initAxios";

class TripAxios extends InitAxios {
    constructor() {
        super('/trip')
    }

    newtrip(body) {
        return this.axios.post('/new', body).then((response) => response.data)
    }

    getAllTrips({ latDriver, lngDriver, maxDistance }) {
        return this.axios.get(`/all?latDriver=${latDriver}&lngDriver=${lngDriver}&maxDistance=${maxDistance}`).then((response) => response.data).catch((error) => console.log(error));
    }

    setClientToTrip(idTrip) {
        return this.axios.put()
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new TripAxios();
        }
        return this.instance;
    }

}

export default TripAxios.getInstance()