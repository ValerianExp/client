import { useContext, useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import tripAxios from "../../services/tripAxios"
import AutoGif from '../../images/icons8-fiat-500.gif'
import './ClientOnTrip.css'
import GrowSpinner from "../GrowSpinner/GrowSpinner"
import { Modal } from "react-bootstrap"
import { Button } from "@chakra-ui/react"
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"
import socket from '../../config/socket.config'
import { AuthContext } from "../../context/auth.context"
import DriverCard from "../DriverCard/DriverCard"
import AcceptTripModal from "../AcceptTripModal/AcceptTripModal"
import WaitingForDriver from "../waitingForDriver/waitingForDriver"
import WaitingForPassengers from "../WaitingForPassengers/WaitingForPassengers"

const ClientOnTrip = () => {
    const [trip, setTrip] = useState(null)
    const { id: tripId } = useParams()
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [loadingTrip, setLoadingTrip] = useState(true)
    const { authentication } = useContext(AuthContext)
    const [socketInfo, setSocketInfo] = useState(null)
    const [showAccept, setShowAccept] = useState(false);
    const { user } = useContext(AuthContext)




    useEffect(() => {

        // socket.connect()
        socket.emit('ConnectRequest', {
            room: tripId
        })

        socket.on('ConnectResponse', (payload) => {
            console.log('CONNECT PAYLOAD', payload)
        })

        socket.on('UpdateTrip', (payload) => {
            console.log('UPDATE PAYLOAD', payload)
            if (payload.message) {
                // socket.broadcast.emit('tripCancel', { message: 'A trip has been cancelled' })
                console.log('MESSAGE ', payload.message)
                authentication()
                navigate('/')
            }
            setTrip(payload)
            setShow(payload.isFinished)
        })

        socket.on('RefreshTrip', (payload) => {
            console.log('PAYLOAD', payload)
            if (payload.message) {
                // socket.broadcast.emit('tripCancel', { message: 'A trip has been cancelled' })
                console.log('MESSAGE ', payload.message)
                authentication()
                navigate('/')
            }
            setTrip(payload.trip)
            setShow(payload.trip.isFinished)
        })


        console.log('TRIPID: ', tripId)
        tripAxios.getTrip(tripId)
            .then((currentTrip) => {
                console.log('CurrentTrip', currentTrip)
                setTrip(currentTrip)
                setShow(currentTrip.isFinished)
                setLoadingTrip(false)
                setShowAccept(true)
            })
            .catch((err) => {
                console.log(err.response.data)

            })

        // return () => {
        //     socket.emit('Disconnect', { message: 'User disconnect' })
        //     console.log('Disconnect')
        //     socket.disconnect()
        // }
    }, [])

    const rateDriver = async (rating) => {
        await tripAxios.rateDriver(tripId, rating)
        authentication()
        navigate('/')
    }

    const handleClose = () => setShow(false);

    const cancelTrip = (id) => {
        console.log('Cancel trip')
        tripAxios.cancelTrip(id)
            .then(() => {
                authentication()
                console.log('Navigate')
                navigate('/')
            }
            )
            .catch((err) => console.log(err))
    }

    const acceptTrip = () => {
        console.log('Trip accepted')
        tripAxios
            .acceptTrip(trip._id)
            .then(({ trip }) => {
                console.log('Response trip', trip)
                setShowAccept(false)
                setTrip(trip)

            })
            .catch((err) => console.log(err))
    }

    // console.log('Boolean: ', trip?.passengers.includes(user?._id.toString()))
    // console.log('clients ', trip?.passengers)
    // console.log('User ', user)
    console.log('TRIP', trip)
    return (
        <div>{
            loadingTrip ? <LoadingSpinner />
                :
                trip && !trip.message && trip.passengers.length !== trip.client.length
                    ? <WaitingForPassengers tripId={trip._id} cancelTrip={cancelTrip} trip={trip} />
                    : trip.driver.length === 0
                        ? <WaitingForDriver tripId={trip._id} cancelTrip={cancelTrip} />
                        : !trip.isFinished && <div className="driverOnWay">
                            <p>Driver is on the way</p>
                            <img src={AutoGif} alt="" className="w-25" />
                            <DriverCard driver={trip.driver[0]} />
                        </div>
            // : <div>Trip not found</div>
        }

            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title>Rate your Driver</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    How good was your driver? Rate him from 1 - 5★ <br />
                    <Button className="rateBtn" onClick={() => rateDriver(1)}>1</Button>
                    <Button className="rateBtn" onClick={() => rateDriver(2)}>2</Button>
                    <Button className="rateBtn" onClick={() => rateDriver(3)}>3</Button>
                    <Button className="rateBtn" onClick={() => rateDriver(4)}>4</Button>
                    <Button className="rateBtn" onClick={() => rateDriver(5)}>5</Button>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
            {trip && !trip.message && !trip?.passengers.includes(user?._id.toString()) &&
                // !trip?.client.includes(user._id.toString()) &&
                < AcceptTripModal trip={trip} showAccept={showAccept} setShowAccept={setShowAccept} cancelTrip={cancelTrip} acceptTrip={acceptTrip} />
            }

        </div>
    )
}

export default ClientOnTrip