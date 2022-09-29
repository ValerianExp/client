import { useContext, useState } from "react"
import tripAxios from "../../../services/tripAxios";

const DriverHomePage = () => {
    const [trips, setTrips] = useState([]);
    const body = {
        latDriver: 90,
        lngDriver: 90,
        maxDistance: 10000000000000,
    }
    const getTrips = () => {
        console.log(body);
        tripAxios.getAllTrips(body).then((response) => {
            console.log(response);
            setTrips(response);
        })
    }

    const handleGetTrip = () => {
        console.log("hola");
    }
    //TODO FROM ORIGIN LAT AND LONG TO ADDRESS
    //TODO FROM DESTINATION LAT AND LONG TO ADDRESS

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
                            <div>Cliente : {trip.client.username}</div>
                            <div>Origen: {trip.from.coordinates[0]}</div>
                            <div>Destino: {trip.from.coordinates[1]}</div>
                            <div>trip._id: {trip._id}</div>
                            <div>price: {trip.price}</div>
                            <button onClick={() => handleGetTrip()}>Pedir viaje</button>
                            <hr />
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
export default DriverHomePage;