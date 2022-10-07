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

const ClientOnTrip = () => {
    const [trip, setTrip] = useState(null)
    const { id: tripId } = useParams()
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [loadingTrip, setLoadingTrip] = useState(true)
    const { authentication } = useContext(AuthContext)
    const [socketInfo, setSocketInfo] = useState(null)


    useEffect(() => {
        tripAxios.getTrip(tripId)
            .then((currentTrip) => {
                console.log('CurrentTrip', currentTrip)
                setTrip(currentTrip)
                setShow(currentTrip.isFinished)
                setLoadingTrip(false)
            })
            .catch((err) => {
                console.log(err.response.data)

            })
        // socket.connect()
        socket.emit('ConnectRequest', {
            room: tripId
        })

        socket.on('ConnectResponse', (payload) => {
            console.log('CONNECT PAYLOAD', payload)
        })

        socket.on('RefreshTrip', (payload) => {
            console.log('REFRESH PAYLOAD', payload)
            setTrip(payload)
            setShow(payload.isFinished)
        })


        return () => socket.disconnect
    }, [])

    const rateDriver = async (rating) => {
        await tripAxios.rateDriver(tripId, rating)
        authentication()
        navigate('/')
    }

    const handleClose = () => setShow(false);
    console.log('Current Trip', trip)

    return (
        <div>{
            loadingTrip ? <LoadingSpinner />
                :
                trip && trip.driver.length === 0
                    ? <div style={{ height: '70vh' }} className="d-flex flex-column justify-content-center align-items-center ">
                        <p className={'m-5'} >Wating for the driver</p>
                        <GrowSpinner />
                    </div>
                    : !trip.isFinished && <div className="driverOnWay">
                        <p>Driver is on the way</p>
                        <img src={AutoGif} alt="" className="w-25" />
                        <DriverCard driver={trip.driver[0]} />
                    </div>
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

        </div>
    )
}

export default ClientOnTrip