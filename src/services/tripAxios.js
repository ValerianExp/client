import InitAxios from "./initAxios";

class TripAxios extends InitAxios {
    constructor() {
        super('/trip')
    }

    newtrip(body) {
        return this.axios.post('/new', body).then((response) => response.data)
    }

    getAllTrips(body) {
        const { latDriver, lngDriver, maxDistance } = body
        // console.log('COORDS', { latDriver: latDriver, lngDriver: lngDriver, maxDistance })
        // console.log('URL', `/all?latDriver=${latDriver}&lngDriver=${lngDriver}&maxDistance=${maxDistance}`)
        return this.axios.get(`/all?latDriver=${latDriver}&lngDriver=${lngDriver}&maxDistance=${maxDistance}`).then((response) => response.data)
    }

    setDriver(idTrip, driverId) {
        return this.axios.put(`/${idTrip}/driver?driverId=${driverId}`).then((response) => response.data)
    }

    getTrip(tripId) {
        return this.axios.get(`/${tripId}`).then((response) => response.data)
    }

    finishTrip(tripId, rating) {
        return this.axios.put(`/${tripId}/finish?rating=${rating}`).then((response) => response.data)
    }

    rateDriver(tripId, rating) {
        return this.axios.put(`/${tripId}/ratedriver?rating=${rating}`).then((response) => response.data)
    }

    acceptTrip(tripId) {
        return this.axios.put(`/${tripId}/accept`).then((response) => response.data)
    }

    cancelTrip(tripId) {
        return this.axios.delete(`/${tripId}/delete`).then((response) => response.data)
    }


    static getInstance() {
        if (!this.instance) {
            this.instance = new TripAxios();
        }
        return this.instance;
    }

}

export default TripAxios.getInstance()