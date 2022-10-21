
import { Button } from "@chakra-ui/react"
import GrowSpinner from "../GrowSpinner/GrowSpinner"

const WaitingForDriver = ({ tripId, cancelTrip }) => {
    return (
        <div style={{ height: '70vh' }} className="d-flex flex-column justify-content-center align-items-center ">
            <p className={'m-5'} >Wating for the driver</p>
            <GrowSpinner />
            <Button onClick={() => cancelTrip(tripId)} className={'m-3'}>Cancel Trip</Button>
        </div>
    )
}

export default WaitingForDriver