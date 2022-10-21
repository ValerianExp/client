import { Button, SkeletonText } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { Modal, Container, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import tripAxios from "../../services/tripAxios"
import { AuthContext } from '../../context/auth.context'
import { MapsContext } from "../../context/map.context"
import Map from "../MapAndSearchBar/Map"
import userLocation from '../../utils/userLocation'
import ClientCard from "../ClientCard/ClientCard"
import './DriverOnTrip.css'
import socket from '../../config/socket.config'

const DriverOnTrip = () => {
    const { isLoaded, setMap } = useContext(MapsContext)
    const { id: tripId } = useParams()
    const navigate = useNavigate()
    const [directionsResponse, setDirectionsResponse] = useState('')
    const [currentTrip, setCurrentTrip] = useState(null)
    const [center, setCenter] = useState(null)
    const [show, setShow] = useState(false);
    const { authentication } = useContext(AuthContext)


    const getDirections = async (trip) => {
        try {
            // eslint-disable-next-line no-undef
            const directionsService = new google.maps.DirectionsService()
            const results = await directionsService.route({
                origin: `${trip?.from.coordinates[1]}, ${trip?.from.coordinates[0]}`,
                destination: `${trip?.to.coordinates[1]}, ${trip?.to.coordinates[0]}`,
                // eslint-disable-next-line no-undef
                travelMode: google.maps.TravelMode.DRIVING,
            })
            setDirectionsResponse(results)

        } catch (err) {
            console.log(err)
        }
    }

    const CenterMap = async () => {
        const location = await userLocation()
        setCenter(location)
    }

    useEffect(() => {
        tripAxios.getTrip(tripId)
            .then((trip) => {
                setCurrentTrip(trip)
                getDirections(trip)
                CenterMap()
            })
            .catch((err) => console.log(err))


        socket.emit('ConnectRequest', {
            room: tripId
        })

        socket.on('ConnectResponse', (payload) => {
            console.log('PAYLOAD', payload)
        })


        // return () => socket.disconnect
    }, [])

    if (!isLoaded || !center || !currentTrip) {
        return <SkeletonText />
    }


    const finishTrip = (rating) => {
        tripAxios.finishTrip(tripId, rating)
            .then((trip) => {
                console.log(trip)
                authentication()
                navigate('/')
            })
            .catch((err) => console.log(err))


    }

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    return (
        <Container>
            {currentTrip && <>
                <div className='d-flex justify-content-center'>
                    <div className='m-2' style={{ width: '100vw', height: '60vh' }}>
                        <Map directionsResponse={directionsResponse} center={center} setMap={setMap} />
                    </div>
                </div>
                <Container>

                    <Row>
                        <ClientCard client={currentTrip.client[0]} className={'col'} />
                        <Container className={'col'}>
                            <Row>

                                <Button onClick={handleOpen} className={' finishBtn'}> Finish Trip</Button >
                                <Button as={'span'} className={'finishBtn'}>
                                    <a href={`https://www.google.com/maps/search/?api=1&query=${currentTrip?.from.coordinates[1]}%2C${currentTrip?.from.coordinates[0]}`} target="_blank">Open in Maps</a>
                                </Button>
                            </Row>
                        </Container>
                    </Row>
                </Container>
            </>

            }

            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title>Rate the Client</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    How good was your client? Rate him from 1-5★ <br />
                    <Button className="rateBtn" onClick={() => finishTrip(1)}>1</Button>
                    <Button className="rateBtn" onClick={() => finishTrip(2)}>2</Button>
                    <Button className="rateBtn" onClick={() => finishTrip(3)}>3</Button>
                    <Button className="rateBtn" onClick={() => finishTrip(4)}>4</Button>
                    <Button className="rateBtn" onClick={() => finishTrip(5)}>5</Button>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </Container >

    )


}

export default DriverOnTrip