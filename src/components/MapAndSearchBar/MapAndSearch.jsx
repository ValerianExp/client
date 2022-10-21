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
import { Form } from 'react-bootstrap'
// import Button from 'react-bootstrap/Button';


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
import GrowSpinner from '../GrowSpinner/GrowSpinner'
import userLocation from '../../utils/userLocation'
import ToastComponent from '../Toast/Toast'
import calculatePrice from '../../utils/calculatePrice'
import { MapsContext } from '../../context/map.context'
import TripToast from '../TripToast/TripToast'
import Multiselect from 'multiselect-react-dropdown'
import socket from '../../config/socket.config'



const MapAndSearch = () => {
    const { isLoaded, setMap } = useContext(MapsContext)

    const navigate = useNavigate()


    const [tripShow, setTripShow] = useState(false)
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [center, setCenter] = useState({ lat: 40.4165, lng: -3.7026 })

    const [origin, setOrigin] = useState(null)

    const [destination, setDestination] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [show, setShow] = useState(false)

    const { user, authentication } = useContext(AuthContext)

    const [price, setPrice] = useState(0)

    const [passengers, setPassengers] = useState([])
    const [update, setUpdate] = useState(null)




    useEffect(() => {
        CenterMap()
        socket.emit('ConnectGeneral', { message: 'Connected' })

        socket.on('pendingTrips', ({ newTrip }) => {
            console.log('UPDATE', newTrip)
            if (newTrip.client.includes(user._id.toString())) {
                setUpdate(newTrip)
                authentication()
                navigate(`/trip/${newTrip._id}`)
            }
        })

        // return () => {
        //     socket.emit('Disconnect', { message: 'User disconnect' })
        //     console.log('Disconnect')
        //     socket.disconnect()
        // }
    }, [])


    const CenterMap = async () => {
        const location = await userLocation()
        setCenter(location)
    }

    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef()
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destiantionRef = useRef()

    if (!isLoaded) {
        return <SkeletonText />
        // return <GrowSpinner />
    }

    async function calculateRoute() {
        try {

            if (originRef.current.value === '' || destiantionRef.current.value === '') {
                return
            }
            // eslint-disable-next-line no-undef
            const directionsService = new google.maps.DirectionsService()
            console.log('origin', originRef.current.value)
            console.log('destination', destiantionRef.current.value)
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
            setPrice(calculatePrice(results.routes[0].legs[0].duration.text))
            setTripShow(true)
        } catch (err) {
            console.log(err)
            if (err.code === "ZERO_RESULTS") {
                console.log(err.code)
                setErrorMessage('No route found from that origin to that destination')
                setShow(true)
            }
        }


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
            if (user.credit > 0) {
                // passenger empty just client
                console.log(passengers)
                const client = passengers.length === 0 ? user._id : passengers
                console.log(client)
                const newtrip = {
                    from_lat: origin.lat,
                    from_lng: origin.lng,
                    to_lat: destination.lat,
                    to_lng: destination.lng,
                    client,
                    // client: user._id,
                    price: price,
                }

                tripAxios.newtrip(newtrip)
                    .then((trip) => {
                        console.log('Trip created')
                        authentication()
                        navigate(`/trip/${trip._id}`)
                    })
                    .catch((err) => {
                        console.log(err.response.data.errorMessage)
                        setErrorMessage(err.response.data.errorMessage)
                        setShow(true)
                    })
            } else {
                console.log('No puedes pedir un viaje si debes dinero')
                setErrorMessage('Cant book a trip if you have negative credit')
                setShow(true)
            }
        } else {
            console.log('No puedes pedir un viaje sin origen ni destino')
            setErrorMessage('Cant request a trip with no origin or destiny')
            setShow(true)
        }
    }

    const handleSelect = (selectedList, selectedItem) => {
        const ids = selectedList.map(user => user._id)
        setPassengers(ids)
        console.log('PASSENGERS', selectedList)
        // console.log(ids)
    }



    return (
        <>
            <Container className='mapAndSearch p-3'>
                <div className='text-center'>
                    <Container className='m-2'>
                        <Row>
                            <Autocomplete onPlaceChanged={calculateRoute} className='col-10'>
                                <input type="text" placeholder='Origin' ref={originRef} className='w-100 h-100 autocomplete' />
                            </Autocomplete>

                            <Button onClick={setOriginLocation} className={'col locationBtn'}>
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

                    <Multiselect options={user?.friends} displayValue='username' selectionLimit={4} onRemove={handleSelect} onSelect={handleSelect} selectedValues={[{ username: `me (${user.username})`, _id: user._id }]} placeholder='Select the other passengers' />

                </div>
                <div className='d-flex justify-content-center'>
                    <div className='m-2' style={{ width: '100vw', height: '60vh' }}>
                        <Map directionsResponse={directionsResponse} center={center} setMap={setMap} />
                    </div>
                </div>


                <Button onClick={requestTrip} className='m-2'>
                    Request Trip
                </Button>

            </Container>
            <ToastComponent errorMessage={errorMessage} show={show} setShow={setShow} />
            <TripToast show={tripShow} duration={duration} distance={distance} price={price} passengers={passengers} setShow={setTripShow} />
        </>

    )



}

export default MapAndSearch