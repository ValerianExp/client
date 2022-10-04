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
import Map from './Map'
import { Container, Row } from 'react-bootstrap'
import './MapAndSearch.css'
import pin from '../../images/pin.png'



const MapAndSearch = ({ isLoaded }) => {
    // TODO mver a un context 


    const navigate = useNavigate()


    const [map, setMap] = useState(/** @type google.maps.Map */(null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [center, setCenter] = useState({ lat: 48.8584, lng: 2.2945 })

    const [origin, setOrigin] = useState(null)

    const [destination, setDestination] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')

    const { user, authentication } = useContext(AuthContext)


    useEffect(() => {
        CenterMap()
    }, [])

    const CenterMap = async () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude
                const lng = position.coords.longitude
                setCenter({ lat, lng })
                // console.log({ lat, lng })
            }
        )
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
        if (user.credit > 0) {
            if (origin && destination) {
                const newtrip = {
                    from_lat: origin.lat,
                    from_lng: origin.lng,
                    to_lat: destination.lat,
                    to_lng: destination.lng,
                    client: user._id,
                    price: Math.round(parseInt(distance))
                }

                tripAxios.newtrip(newtrip)
                    .then((trip) => {
                        console.log('Trip created')
                        authentication()
                        navigate(`/trip/${trip._id}`)
                    })
                    .catch((err) => console.log(err))
            } else {
                console.log('No puedes pedir un viaje sin origen ni destino')
                setErrorMessage('No puedes pedir un viaje sin origen ni destino')
            }
        } else {
            console.log('No puedes pedir un viaje si debes dinero')
            setErrorMessage('Cannot book a trip if you dont have credit')
        }
    }





    return (

        <Container className='mapAndSearch p-3'>
            <div className='text-center'>
                <Container className='m-2'>
                    <Row>
                        <Autocomplete onPlaceChanged={calculateRoute} className='col-10'>
                            <input type="text" placeholder='Origin' ref={originRef} className='w-100 h-100 autocomplete' />
                        </Autocomplete>

                        <Button onClick={setOriginLocation} className='col'>
                            <img src={pin} alt="" className='pin' />
                        </Button>
                    </Row>
                </Container>

                <Container className='m-2'>
                    <Row>
                        <Autocomplete onPlaceChanged={calculateRoute} className='col-10'>
                            <input type="text" placeholder='Destination' ref={destiantionRef} className='w-100 h-100 autocomplete' />
                        </Autocomplete>
                    </Row>
                </Container>


                <Button onClick={CenterMap} className='m-2'>
                    Center
                </Button>

                <Button onClick={clearRoute}>
                    Clear Route
                </Button>

            </div>
            <div className='d-flex justify-content-center'>
                <div className='m-2' style={{ width: '100vw', height: '60vh' }}>
                    <Map directionsResponse={directionsResponse} center={center} setMap={setMap} />
                </div>
            </div>

            {duration ? <>
                <p>DURATION: {duration}</p>
                <p>DISTANCE: {distance}</p>
                <p>PRICE: {Math.round(parseInt(distance))} </p>
            </> : null
            }

            {errorMessage && <div id='errorMessage' >{errorMessage}</div>}

            <Button onClick={requestTrip} className='m-2'>
                Request Trip
            </Button>

        </Container>

    )



}

export default MapAndSearch