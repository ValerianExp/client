import { Button } from "@chakra-ui/react"
import { DirectionsRenderer, GoogleMap, Marker } from "@react-google-maps/api"
import { useContext, useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import tripAxios from "../../services/tripAxios"
import { AuthContext } from '../../context/auth.context'

const DriverOnTrip = () => {
    const { id: tripId } = useParams()
    const navigate = useNavigate()
    const [directionsResponse, setDirectionsResponse] = useState('')
    const [currentTrip, setCurrentTrip] = useState(null)
    const [center, setCenter] = useState({ lat: 48.8584, lng: 2.2945 })
    const [map, setMap] = useState(/** @type google.maps.Map */(null))
    const [show, setShow] = useState(false);
    const { authentication } = useContext(AuthContext)

    useEffect(() => {
        tripAxios.getTrip(tripId)
            .then((trip) => {
                setCurrentTrip(trip)
                // getDirections()
                // CenterMap()
            })
            .catch((err) => console.log(err))
    }, [])



    const finishTrip = (rating) => {
        tripAxios.finishTrip(tripId, rating)
            .then((trip) => console.log(trip))
            .catch((err) => console.log(err))
        authentication()
        navigate('/')

    }

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);



    // const getDirections = async () => {
    //     try {
    //         // eslint-disable-next-line no-undef
    //         const directionsService = new google.maps.DirectionsService()
    //         console.log(`${currentTrip?.from.coordinates[0]}, ${currentTrip?.from.coordinates[1]}`)
    //         console.log('40.4450141, -3.6521948')
    //         const results = await directionsService.route({
    //             // origin: `${currentTrip?.from.coordinates[1]}, ${currentTrip?.from.coordinates[0]}`,
    //             // destination: `${currentTrip?.to.coordinates[1]}, ${currentTrip?.to.coordinates[0]}`,
    //             origin: '40.4450141, - 3.6521948',
    //             destination: '42.4450141, -3.7521948',
    //             // eslint-disable-next-line no-undef
    //             travelMode: google.maps.TravelMode.DRIVING,
    //         })
    //         setDirectionsResponse(results)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // const CenterMap = async () => {
    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             const lat = position.coords.latitude
    //             const lng = position.coords.longitude
    //             setCenter({ lat, lng })
    //             // console.log({ lat, lng })
    //         }
    //     )
    // }



    return (
        !show && currentTrip ? <div>
            <p>Driver on the way</p>
            {/* {directionsResponse && <div style={{ width: '500px', height: '500px' }}>
                {/* Google Map div */}
            {/* <GoogleMap
                center={center}
                zoom={15}
                mapContainerStyle={{ width: '100%', height: '100%' }}
                options={{
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                }}
                onLoad={map => setMap(map)}
            >

                {directionsResponse ? (
                    <DirectionsRenderer directions={directionsResponse} />
                ) : <Marker position={center} icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }} />}
            </GoogleMap>
        </div>} * /} */}

            <>
                < Button onClick={handleOpen} > Finish Trip</Button >

            </>
        </div > : <Modal show={true} onHide={handleClose}>
            <Modal.Header >
                <Modal.Title>Rate the Client</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button className="rateBtn" onClick={() => finishTrip(1)}>1</Button>
                <Button className="rateBtn" onClick={() => finishTrip(2)}>2</Button>
                <Button className="rateBtn" onClick={() => finishTrip(3)}>3</Button>
                <Button className="rateBtn" onClick={() => finishTrip(4)}>4</Button>
                <Button className="rateBtn" onClick={() => finishTrip(5)}>5</Button>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>

    )


}

export default DriverOnTrip