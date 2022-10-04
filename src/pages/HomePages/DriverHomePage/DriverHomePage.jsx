import { Button, Container, Form, ListGroup, Row } from "react-bootstrap";
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/auth.context";
import tripAxios from "../../../services/tripAxios";
import coordsToAddress from "../../../utils/coordsToAddress";
import { SkeletonText } from "@chakra-ui/react";

const DriverHomePage = ({ isLoaded }) => {
    const { user, authentication } = useContext(AuthContext)
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate()
    const [maxDistance, setMaxDistance] = useState(50000000)

    const [location, setLocation] = useState({})



    useEffect(() => {
        let latDriver
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // const latDriver = 90
                latDriver = position.coords.latitude
                // const lngDriver = 90
                const lngDriver = position.coords.longitude
                setLocation({ latDriver, lngDriver })
                // console.log({ lat, lngDriver })
            }
        )
        // getTrips()
    }, [maxDistance])

    if (!isLoaded) {
        return <SkeletonText />
    }
    const getTrips = () => {
        const body = { ...location, maxDistance }
        console.log(body)
        tripAxios.getAllTrips(body)
            .then((trips) => {
                console.log('TRIPS', trips);
                const newTrips = trips.map((trip) => {
                    const addFrom = coordsToAddress(trip.from.coordinates)
                    const addTo = coordsToAddress(trip.to.coordinates)
                    return ({ ...trip, addFrom, addTo })
                });
                console.log('NEWTRIPS', newTrips)
                setTrips(newTrips);
            })
            .catch((err) => {
                console.log(err.response.data)
            })
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

    // const reverseGeocode = async (coords) => {
    //     try {
    //         const address = await coordsToAddress([coords[1], coords[0]])
    //         console.log(address)
    //     } catch (err) {
    //         console.log(err)
    //     }

    // }

    const getMaxDistance = (e) => {
        console.log(e.target.value)
        setMaxDistance(e.target.value)
    }



    return (
        <Container>
            {/* <Button onClick={() => reverseGeocode([-3, 40])}>Reverse geoCode</Button> */}
            <>
                <Form.Label>Max distance:</Form.Label>
                <Form.Range onChange={getMaxDistance} value={maxDistance} max={100} min={0.1} />
            </>

            <ListGroup>
                {trips.map((trip) => {
                    { console.log('TRIP', trip) }
                    return (
                        <ListGroup.Item key={trip._id}>
                            <Container>
                                <Row>
                                    <div className={'col-3 d-flex flex-column'}>
                                        <img src={trip.client[0].avatar} alt="" />
                                        <p>@{trip.client[0].username}</p>
                                        <p>{trip.client[0].rating}</p>

                                    </div>
                                    <div className="col">
                                        <h3>ORIGIN: {trips.addFrom}</h3>
                                        <h5>DESTINATION: {trip.to.coordinates[1]},{trip.to.coordinates[0]}</h5>
                                        <p>PRICE: {trip.price}</p>
                                        <Button onClick={() => handleGetTrip(trip._id)}>Request Trip</Button>
                                    </div>
                                </Row>
                            </Container>
                        </ListGroup.Item>

                    )
                })}

            </ListGroup>


            {/* <ul>
                {trips?.map((trip) => {
                    return (
                        <li key={trip._id}>
                            <hr />
                            <div>Client : {trip.client[0].username}</div>
                            <div>Client Rating: {trip.client}</div>
                            <div>Origin: {trip.from.coordinates[1]}, {trip.from.coordinates[0]}</div>
                            {/* <div>Origin: {coordsToAddress([trip.from.coordinates])}</div> */}
            {/* <div>Destination: {trip.to.coordinates[1]}, {trip.to.coordinates[0]}</div>
                            <div>price: {trip.price}</div>
                            <button onClick={() => handleGetTrip(trip._id)}>Request Trip</button>
                            <hr />
                        </li>
                    )
                })}
            </ul> */}

            <Button onClick={getTrips}>Refresh Trips</Button>
        </Container>
    )
}
export default DriverHomePage;