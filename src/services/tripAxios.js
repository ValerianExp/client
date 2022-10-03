import InitAxios from "./initAxios";

class TripAxios extends InitAxios {
    constructor() {
        super('/trip')
    }

    newtrip(body) {
        return this.axios.post('/new', body).then((response) => response.data)
    }

    getAllTrips({ latDriver, lngDriver, maxDistance }) {
        console.log('COORDS', { latDriver, lngDriver, maxDistance })
        return this.axios.get(`/all?latDriver=${latDriver}&lngDriver=${lngDriver}&maxDistance=${maxDistance}`).then((response) => response.data).catch((error) => console.log(error));
    }

    setDriver(idTrip, driverId) {
        return this.axios.put(`/${idTrip}/driver?driverId=${driverId}`).then((response) => response.data)
    }

    getTrip(tripId) {
        return this.axios.get(`/${tripId}`).then((response) => response.data)
    }

    finishTrip(tripId) {
        return this.axios.put(`/${tripId}/finish`).then((response) => response.data)
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new TripAxios();
        }
        return this.instance;
    }

}

export default TripAxios.getInstance()