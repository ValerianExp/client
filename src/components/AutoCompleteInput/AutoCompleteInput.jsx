import { useState } from 'react'
import Autocomplete from 'react-google-autocomplete'
import mapsAuxios from '../../services/mapsAuxios'


const AutoCompleteInput = () => {
    const [address, setAddress] = useState('')
    const [coords, setCoords] = useState([])

    const transformAddress = (place) => {
        console.log('Receiving place ', place)
        if (place !== undefined) {
            setAddress(place.formatted_address)
            mapsAuxios.geoCode(place?.place_id)
                .then((data) => {
                    console.log(data.results.geometry.location)
                })
                .catch((err) => console.log(err))
        }
    }

    return (
        <>
            <Autocomplete
                apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                onPlaceSelected={(place) => {
                    console.log('Sending place ', place)
                    transformAddress(place)
                }}
                options={{
                    types: [],
                    componentRestrictions: { country: "es" },
                }}
            />
            <p>{address}</p>
        </>
    )

}


export default AutoCompleteInput