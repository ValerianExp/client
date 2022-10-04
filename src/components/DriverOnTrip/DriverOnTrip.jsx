import { DirectionsRenderer, GoogleMap, Marker } from "@react-google-maps/api"
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import tripAxios from "../../services/tripAxios"
import Modal from "../Modal/ModalComponent"

const DriverOnTrip = () => {
    const { id: tripId } = useParams()
    const navigate = useNavigate()
    const [tripFinished, setTipFinished] = useState(false)
    const [directionsResponse, setDirectionsResponse] = useState('')
    const [currentTrip, setCurrentTrip] = useState(null)
    const [center, setCenter] = useState({ lat: 48.8584, lng: 2.2945 })
    const [map, setMap] = useState(/** @type google.maps.Map */(null))

    useEffect(() => {
        tripAxios.getTrip(tripId)
            .then((trip) => {
                setCurrentTrip(trip)
                // getDirections()
                // CenterMap()
            })
            .catch((err) => console.log(err))
    }, [])



    const finishTrip = () => {
        tripAxios.finishTrip(tripId)
            .then((trip) => console.log(trip))
            .catch((err) => console.log(err))

        setTipFinished(true)
    }


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
        !tripFinished && currentTrip ? <div>
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


            < Button onClick={finishTrip} > Finish Trip</Button >
        </div >
            :
            <Modal />
    )


}

export default DriverOnTrip