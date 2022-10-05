import { useJsApiLoader } from "@react-google-maps/api"
import { createContext, useState } from "react"


export const MapsContext = createContext()

export const MapProvider = (props) => {
    const [map, setMap] = useState(/** @type google.maps.Map */(null))
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
        language: 'en'
    })

    return (
        <MapsContext.Provider value={{ isLoaded, setMap }} >
            {props.children}
        </MapsContext.Provider>
    )

}