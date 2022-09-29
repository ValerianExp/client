import axios from "axios"

class MapsAxios {
    constructor() {
        this.axios = axios.create({
            baseURL: 'https://maps.googleapis.com/maps/api/geocode/json'
        })
    }

    geocode(placeID) {
        return this.axios.get(`?place_id=${placeID}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`).then((response) => response.data)
    }
}

export default MapsAxios