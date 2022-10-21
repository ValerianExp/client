import { Button } from "@chakra-ui/react"
import { SettingsBrightnessSharp } from "@mui/icons-material"
import { useEffect, useState } from "react"
import tripAxios from "../../services/tripAxios"
import tick from '../../images/accept.png'
import cross from '../../images/remove.png'
import './WaitingForPassengers.css'

const WaitingForPassengers = ({ tripId, cancelTrip, trip }) => {
    // const [trip, setTrip] = useState()
    // useEffect(() => {
    //     tripAxios.getTrip(tripId)
    //         .then((newTrip) => setTrip(newTrip))
    //         .catch((err) => console.log(err))
    // }, [])

    console.log('WAITING TRIP ', trip)

    return (
        <div style={{ height: '70vh' }} className="d-flex flex-column justify-content-center align-items-center ">
            <div>Waiting for the rest of the passengers</div>
            <ul>
                {trip && trip.client.map((client) => {
                    return (
                        <li className="d-flex justify-content-center align-items-center p-2" key={client._id}><img src={trip.passengers.includes(client._id.toString()) ? tick : cross} alt="" className="passenger-status" /> @{client.username}</li>
                    )
                })}
            </ul>

            <Button onClick={() => cancelTrip(tripId)} className={'m-3'}>Cancel Trip</Button>
        </div>
    )
}

export default WaitingForPassengers