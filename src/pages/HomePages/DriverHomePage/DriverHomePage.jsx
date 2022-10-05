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

const DriverHomePage = ({ isLoaded }) => {
    const { user, authentication } = useContext(AuthContext)
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate()
    const [maxDistance, setMaxDistance] = useState(50000000)

    const [location, setLocation] = useState({})



    useEffect(() => {
        userLocation()
            .then((location) => {
                setLocation({ latDriver: location.lat, lngDriver: location.lng })
            })
            .catch((err) => console.log(err))
        // getTrips()
    }, [maxDistance])

    if (!isLoaded) {
        return <SkeletonText />
    }
    const getTrips = async () => {
        try {
            const body = { ...location, maxDistance }
            console.log('BODY', body)
            const trips = await tripAxios.getAllTrips(body)
            const values = await Promise.all(
                trips.map((trip) => {
                    return ([coordsToAddress(trip.from.coordinates), coordsToAddress(trip.to.coordinates)])
                }).flat()
            )
            console.log('VALUES', values)
            const newTrips = trips.map((trip, index) => {
                return ({ ...trip, addFrom: values[2 * index], addTo: values[2 * index + 1] })
            })
            setTrips(newTrips)
            // const body = { ...location, maxDistance }
            // console.log('BODY', body)
            // const trips = await tripAxios.getAllTrips(body)
            // Promise.all(
            //     trips.map((trip) => {
            //         return ([coordsToAddress(trip.from.coordinates), coordsToAddress(trip.to.coordinates)])
            //     }).flat()
            // ).then((values) => {

            //     console.log(values)
            // })
        } catch (err) {
            console.log(err)
        }

    }

    const handleGetTrip = (tripId) => {
        tripAxios.setDriver(tripId, user._id)
            .then(({ trip }) => {
                authentication()
                navigate(`/trip/${trip._id}`)
            })
            .catch((err) => {
                console.log(err.response.data)
                navigate(`/error/${err.response.data}`)
            })

    }
    //TODO FROM ORIGIN LAT AND LONG TO ADDRESS
    //TODO FROM DESTINATION LAT AND LONG TO ADDRESS



    const getMaxDistance = (e) => {
        console.log(e.target.value)
        setMaxDistance(e.target.value)
    }



    return (
        <Container>
            <>
                <Form.Label>Max distance:</Form.Label>
                <Form.Range onChange={getMaxDistance} value={maxDistance} max={100} min={0.1} />
            </>

            <ListGroup>
                {trips.map((trip) => {
                    console.log(trip)
                    return (
                        <ListGroup.Item key={trip._id}>
                            <Container>
                                <Row>
                                    <div className={'col-3 d-flex flex-column'}>
                                        <img src={trip.client[0].avatar} alt="" />
                                        <p>@{trip.client[0].username}</p>
                                        <p>{averageStars(trip.client[0].rating)}★</p>

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


            <Button onClick={getTrips}>Refresh Trips</Button>
        </Container>
    )
}
export default DriverHomePage;