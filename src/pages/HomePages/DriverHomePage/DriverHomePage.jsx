import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/auth.context";
import tripAxios from "../../../services/tripAxios";

const DriverHomePage = () => {
    const { user } = useContext(AuthContext)
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate()
    const maxDistance = 10000000

    const [location, setLocation] = useState({})

    const body = {
        latDriver: 90,
        lngDriver: 90,
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // const latDriver = 90
                const latDriver = position.coords.latitude
                // const lngDriver = 90
                const lngDriver = position.coords.longitude
                setLocation({ latDriver, lngDriver })
                // console.log({ lat, lngDriver })
            }
        )
    }, [])

    const getTrips = () => {
        const body = { ...location, maxDistance }
        console.log(body)
        tripAxios.getAllTrips(body)
            .then((response) => {
                console.log('TRIPS', response);
                setTrips(response);
            })
    }

    const handleGetTrip = (tripId) => {
        console.log("hola");
        tripAxios.setDriver(tripId, user._id)
            .then(({ trip }) => {
                console.log(trip)
                navigate(`/trip/${trip._id}`)
            })
            .catch((err) => console.log(err))

    }
    //TODO FROM ORIGIN LAT AND LONG TO ADDRESS
    //TODO FROM DESTINATION LAT AND LONG TO ADDRESS

    console.log('TRIP', trips)

    return (
        <>
            <div>Driver Home Page</div>
            <button onClick={getTrips}>Get Trips</button>
            <h3>Viajes sin conductor</h3>

            <ul>
                {trips.map((trip) => {
                    return (
                        <li key={trip._id}>
                            <hr />
                            <div>Cliente : {trip.client[0].username}</div>
                            <div>Origen: {trip.from.coordinates[0]}</div>
                            <div>Destino: {trip.from.coordinates[1]}</div>
                            <div>trip._id: {trip._id}</div>
                            <div>price: {trip.price}</div>
                            <button onClick={() => handleGetTrip(trip._id)}>Pedir viaje</button>
                            <hr />
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
export default DriverHomePage;