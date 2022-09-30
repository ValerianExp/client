import { useState } from "react"
import { Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import tripAxios from "../../services/tripAxios"
import Modal from "../Modal/ModalComponent"

const DriverOnTrip = () => {
    const { id: tripId } = useParams()
    const navigate = useNavigate()
    const [tripFinished, setTipFinished] = useState(false)

    const finishTrip = () => {
        tripAxios.finishTrip(tripId)
            .then((trip) => console.log(trip))
            .catch((err) => console.log(err))

        setTipFinished(true)
    }

    return (
        !tripFinished ? <div>
            <p>Driver on the way</p>
            <Button onClick={finishTrip}>Finish Trip</Button>
        </div>
            :
            <Modal />
    )
}

export default DriverOnTrip