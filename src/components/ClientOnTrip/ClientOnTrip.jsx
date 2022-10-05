import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import tripAxios from "../../services/tripAxios"
import AutoGif from '../../images/icons8-fiat-500.gif'
import './ClientOnTrip.css'
import GrowSpinner from "../GrowSpinner/GrowSpinner"
import { Modal } from "react-bootstrap"
import { Button } from "@chakra-ui/react"

const ClientOnTrip = () => {
    const [trip, setTrip] = useState(null)
    const { id: tripId } = useParams()
    const navigate = useNavigate()
    const [show, setShow] = useState(false)

    useEffect(() => {
        tripAxios.getTrip(tripId)
            .then((currentTrip) => {
                setTrip(currentTrip)
            })
            .catch((err) => {
                console.log(err.response.data)

            })
    }, [])

    const rateDriver = async (rating) => {
        await tripAxios.rateDriver(tripId, rating)
        navigate('/')
    }

    const handleClose = () => setShow(false);

    return (
        <div>{!trip
            ? ' No trip'
            : trip.driver.length === 0
                ? <div style={{ height: '70vh' }} className="d-flex flex-column justify-content-center align-items-center ">
                    <p className={'m-5'} >Wating for the driver</p>
                    <GrowSpinner />
                </div>
                : !trip.isFinished
                    ? <div className="driverOnWay">
                        <p>Driver is on the way</p>
                        <img src={AutoGif} alt="" className="w-25" />
                    </div>
                    : <>
                        <p>Viaje finalizado</p>
                        <Modal show={true} onHide={handleClose}>
                            <Modal.Header >
                                <Modal.Title>Rate your Driver</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                How good was your driver? Rate him from 1 - 5★
                                <Button className="rateBtn" onClick={() => rateDriver(1)}>1</Button>
                                <Button className="rateBtn" onClick={() => rateDriver(2)}>2</Button>
                                <Button className="rateBtn" onClick={() => rateDriver(3)}>3</Button>
                                <Button className="rateBtn" onClick={() => rateDriver(4)}>4</Button>
                                <Button className="rateBtn" onClick={() => rateDriver(5)}>5</Button>
                            </Modal.Body>
                            <Modal.Footer>
                            </Modal.Footer>
                        </Modal>
                    </>
        }
        </div>
    )
}

export default ClientOnTrip