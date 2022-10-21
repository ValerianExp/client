import { Container, Form, ListGroup, Row } from "react-bootstrap";
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/auth.context";
import tripAxios from "../../../services/tripAxios";
import coordsToAddress from "../../../utils/coordsToAddress";
import { SkeletonText } from "@chakra-ui/react";
import userLocation from "../../../utils/userLocation";
import averageStars from '../../../utils/averageStars'
import { Button } from "@chakra-ui/react";
import ToastComponent from '../../../components/Toast/Toast'
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import socket from '../../../config/socket.config'
import passenger from '../../../images/user.png'
import './DriverHomePage.css'


const DriverHomePage = () => {
    const { user, authentication } = useContext(AuthContext)
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate()
    const [maxDistance, setMaxDistance] = useState(50000)

    const [location, setLocation] = useState({})
    const [show, setShow] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    const [called, setCalled] = useState(false)

    const [update, setUpdate] = useState(null)

    const getTrips = async () => {
        try {
            // let body;
            // if (!loc) {
            //     body = { ...location, maxDistance }
            //     console.log('BODY', body)
            // } else {
            //     body = { ...loc, maxDistance }
            // }
            console.log('Length', Object.keys(location).length)
            if (Object.keys(location).length !== 0) {
                const body = { ...location, maxDistance }
                console.log(body)
                const trips = await tripAxios.getAllTrips(body)
                const values = await Promise.all(
                    trips.map((trip) => {
                        return ([coordsToAddress(trip.from.coordinates), coordsToAddress(trip.to.coordinates)])
                    }).flat()
                )
                const newTrips = trips.map((trip, index) => {
                    return ({ ...trip, addFrom: values[2 * index], addTo: values[2 * index + 1] })
                })
                setTrips(newTrips)
                setCalled(true)
            }
        } catch (err) {
            console.log(err.response.data.errorMessage)
            setErrorMessage(err.response.data.errorMessage)
            setShow(true)
        }

    }



    useEffect(() => {
        userLocation()
            .then(async (location) => {
                await setLocation({ latDriver: location.lat, lngDriver: location.lng })
                await getTrips({ latDriver: location.lat, lngDriver: location.lng })
            })
            .catch((err) => {
                console.log(err.message)
                if (err.code === 1) {
                    // console.log(err.response.data.errorMessage)
                    setErrorMessage('Please, enable the geolocation')
                    setShow(true)
                }
            })

        socket.emit('ConnectGeneral')

        socket.on('newTrips', (payload) => {
            console.log('UPDATE', payload)
            setUpdate(payload)
        })


    }, [update])


    const handleGetTrip = (tripId) => {
        tripAxios.setDriver(tripId, user._id)
            .then(({ trip }) => {
                authentication()
                navigate(`/trip/${trip._id}`)
            })
            .catch((err) => {
                console.log(err.response.data.errorMessage)
                setErrorMessage(err.response.data.errorMessage)
                setShow(true)
                getTrips()

            })

    }


    const getMaxDistance = (e) => {
        console.log(e.target.value)
        setMaxDistance(e.target.value)
    }



    return (
        <Container>
            <>
                <Form.Label>Max distance: {maxDistance / 1000} km</Form.Label>
                <Form.Range onChange={getMaxDistance} value={maxDistance} max={100000} min={1000} />
            </>

            <ListGroup>
                {trips.length === 0 && called ? <div>
                    <p>Not available trips at the moment.</p>
                    <p>Try Later!</p>
                </div>
                    :
                    trips.map((trip) => {
                        console.log(trip)
                        return (
                            <ListGroup.Item key={trip._id}>
                                <Container>
                                    <Row>
                                        <div className={'col-4 d-flex flex-column'}>
                                            <img src={trip.client[0].avatar} alt="" />
                                            <p>@{trip.client[0].username}</p>
                                            <p>{averageStars(trip.client[0].rating)}★</p>
                                            <div className="d-flex">
                                                {trip.client.length} <img src={passenger} alt="" className='passenger-icon' />
                                            </div>

                                        </div>
                                        <div className="col">
                                            <h3>ORIGIN: {trip.addFrom}</h3>
                                            <h5>DESTINATION: {trip.addTo}</h5>
                                            <p>PRICE: {trip.price}$</p>
                                            <Button onClick={() => handleGetTrip(trip._id)}>Request Trip</Button>
                                        </div>
                                    </Row>
                                </Container>
                            </ListGroup.Item>

                        )
                    })}

            </ListGroup>


            <Button onClick={getTrips} className='m-2'>Refresh Trips</Button>
            <ToastComponent errorMessage={errorMessage} show={show} setShow={setShow} />
        </Container>
    )
}
export default DriverHomePage;