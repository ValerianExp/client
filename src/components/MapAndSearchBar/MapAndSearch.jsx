import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    Input,
    SkeletonText,
    Text,
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'

import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
} from '@react-google-maps/api'


import { useContext, useEffect, useRef, useState } from 'react'
import tripAxios from '../../services/tripAxios'
import addressToCoords from '../../utils/addressToCoords'
import coordsToAddress from '../../utils/coordsToAddress'
import { AuthContext } from '../../context/auth.context'
import { useNavigate } from 'react-router-dom'



const MapAndSearch = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ['places']
    })

    const navigate = useNavigate()


    const [map, setMap] = useState(/** @type google.maps.Map */(null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [center, setCenter] = useState({ lat: 48.8584, lng: 2.2945 })

    const [origin, setOrigin] = useState(null)

    const [destination, setDestination] = useState(null)

    const { user } = useContext(AuthContext)


    useEffect(() => {
        CenterMap()
    }, [])

    const CenterMap = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude
                const lng = position.coords.longitude
                setCenter({ lat, lng })
                console.log({ lat, lng })
            }
        )
        // console.log(lat, lng)
    }

    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef()
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destiantionRef = useRef()

    if (!isLoaded) {
        return <SkeletonText />
    }

    async function calculateRoute() {
        if (originRef.current.value === '' || destiantionRef.current.value === '') {
            return
        }
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: originRef.current.value,
            destination: destiantionRef.current.value,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING,
        })
        const placeIdOrigin = results.geocoded_waypoints[0].place_id
        const placeIdDest = results.geocoded_waypoints[1].place_id
        const originCoords = await addressToCoords(placeIdOrigin)
        const destinationCoords = await addressToCoords(placeIdDest)

        setOrigin(originCoords)
        setDestination(destinationCoords)

        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
    }

    const clearRoute = () => {
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        originRef.current.value = ''
        destiantionRef.current.value = ''
    }

    const setOriginLocation = () => {
        originRef.current.value = `${center.lat}, ${center.lng}`
    }

    const requestTrip = () => {
        if (origin && destination) {
            const newtrip = {
                from_lat: origin.lat,
                from_lng: origin.lng,
                to_lat: destination.lat,
                to_lng: destination.lng,
                client: user._id,
                price: Math.round(parseInt(distance))
            }
            coordsToAddress([destination.lat, destination.lng])
                .then((res) => console.log(res))
                .catch((err) => console.log(err))

            tripAxios.newtrip(newtrip)
                .then((trip) => {
                    console.log('Trip created')
                    navigate(`/trip/${trip._id}`)
                })
                .catch((err) => console.log(err))
        } else {
            console.log('No puedes pedir un viaje sin origen ni destino')
        }
    }





    return (

        <>
            <div className='text-center'>
                <Autocomplete onPlaceChanged={calculateRoute}>
                    <input type="text" placeholder='Origin' ref={originRef} />
                </Autocomplete>

                <Button onClick={setOriginLocation}>
                    Use Your Location
                </Button>

                <Autocomplete onPlaceChanged={calculateRoute}>
                    <input type="text" placeholder='Destination' ref={destiantionRef} />
                </Autocomplete>

                <Button onClick={CenterMap}>
                    Center
                </Button>

                <Button onClick={clearRoute}>
                    Clear Route
                </Button>

                {duration ? <>

                    <p>DURATION: {duration}</p>
                    <p>PRICE: {Math.round(parseInt(distance))} </p>
                </> : null
                }


                <Button onClick={requestTrip}>
                    Request Trip
                </Button>

            </div>

            <div style={{ width: '500px', height: '500px' }}>
                {/* Google Map div */}
                <GoogleMap
                    center={center}
                    zoom={15}
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                    onLoad={map => setMap(map)}
                >
                    <Marker position={center} />
                    {directionsResponse && (
                        <DirectionsRenderer directions={directionsResponse} />
                    )}
                </GoogleMap>
            </div>
        </>

    )

}

export default MapAndSearch