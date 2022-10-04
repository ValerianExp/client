import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import tripAxios from "../../services/tripAxios"
import AutoGif from '../../images/icons8-fiat-500.gif'
import './ClientOnTrip.css'

const ClientOnTrip = () => {
    const [trip, setTrip] = useState(null)
    const { id: tripId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        tripAxios.getTrip(tripId)
            .then((currentTrip) => {
                setTrip(currentTrip)
            })
            .catch((err) => {
                console.log(err.response.data)
                navigate(`/error/${err.response.data}`)
            })
    }, [])

    return (
        <div>{!trip
            ? ' No trip'
            : trip.driver.length === 0
                ? 'Wating for the driver'
                : !trip.isFinished
                    ? <div className="driverOnWay">
                        <p>Driver is on the way</p>
                        <img src={AutoGif} alt="" className="w-25" />
                    </div>
                    : <p>Viaje finalizado</p>
        }
        </div>
    )
}

export default ClientOnTrip