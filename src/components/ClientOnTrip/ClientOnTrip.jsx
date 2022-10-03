import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import tripAxios from "../../services/tripAxios"

const ClientOnTrip = () => {
    const [trip, setTrip] = useState(null)
    const { id: tripId } = useParams()

    useEffect(() => {
        tripAxios.getTrip(tripId)
            .then((currentTrip) => {
                setTrip(currentTrip)
            })
            .catch((err) => console.log(err))

    }, [])

    return (
        <div>{!trip
            ? ' No trip'
            : trip.driver.length === 0
                ? 'No driver'
                : !trip.isFinished
                    ? <p>DRIVER: {trip.driver[0]}</p>
                    : <p>Viaje finalizado</p>
        }
        </div>
    )
}

export default ClientOnTrip