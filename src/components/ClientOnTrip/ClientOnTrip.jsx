import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import tripAxios from "../../services/tripAxios"

const ClientOnTrip = () => {
    const [trip, setTrip] = useState(null)
    const { id: tripId } = useParams()

    useEffect(() => {
        console.log('Request')
        tripAxios.getTrip(tripId)
            .then((currentTrip) => {
                console.log(currentTrip)
                setTrip(currentTrip)
            })
            .catch((err) => console.log(err))

    }, [])

    console.log(trip)
    return (
        <div>{!trip ? ' No trip' : trip.driver.length === 0 ? 'No driver' : <p>DRIVER: {trip.driver[0]}</p>}</div>
    )
}

export default ClientOnTrip