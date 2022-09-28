import axios from "axios";

class MapsAxios {
    constructor() {
        this.axios = axios.create({
            baseURL: 'https://maps.googleapis.com/maps/api/geocode/json'
        })
    }

    geoCode(place) {
        return this.axios.get(`?place_id=${place}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`).then((response) => response.data)
    }

    reversegeoCode(coords) {
        return this.axios.get(`latlng=${coords[0]},${coords[1]}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`).then((response) => response.data)

    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new MapsAxios();
        }
        return this.instance;
    }
}

export default MapsAxios.getInstance()

