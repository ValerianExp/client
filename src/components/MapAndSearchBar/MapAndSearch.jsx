import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    Input,
    SkeletonText,
    Text,
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'

import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
} from '@react-google-maps/api'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';


const MapAndSearch = () => {
    console.log('MAPA')

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ['places']
    })

    const [map, setMap] = useState(/** @type google.maps.Map */(null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [center, setCenter] = useState({ lat: 48.8584, lng: 2.2945 })

    useEffect(() => {
        CenterMap()
    }, [])

    const CenterMap = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // console.log("Latitude is :", position.coords.latitude);
                // console.log("Longitude is :", position.coords.longitude);
                const lat = position.coords.latitude
                const lng = position.coords.longitude
                // console.log(lat)
                setCenter({ lat, lng })
            }
        )
    }




    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef()
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destiantionRef = useRef()

    if (!isLoaded) {
        return <SkeletonText />
    }

    async function calculateRoute() {
        if (originRef.current.value === '' || destiantionRef.current.value === '') {
            return
        }
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: originRef.current.value,
            destination: destiantionRef.current.value,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
    }

    function clearRoute() {
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        originRef.current.value = ''
        destiantionRef.current.value = ''
    }

    const setOriginLocation = () => {
        console.log(center.lat)
        console.log(originRef.current.value)
        originRef.current.value = `${center.lat}, ${center.lng}`
    }

    return (
        // <Flex
        //     position='relative'
        //     flexDirection='column'
        //     alignItems='center'
        //     h='100vh'
        //     w='100vw'
        // >
        <>
            <div>
                <Autocomplete onPlaceChanged={calculateRoute}>
                    <input type="text" placeholder='Origin' ref={originRef} />
                </Autocomplete>

                <Button onClick={setOriginLocation}>
                    Use Your Location
                </Button>

                <Autocomplete onPlaceChanged={calculateRoute}>
                    <input type="text" placeholder='Destination' ref={destiantionRef} />
                </Autocomplete>

                <Button onClick={CenterMap}>
                    Center
                </Button>

                <Button onClick={clearRoute}>
                    Clear Route
                </Button>

                <Button onClick={calculateRoute}>
                    Calculate Route
                </Button>

                <p>{distance}</p>
                <p>{duration}</p>

                <Button>
                    Request Trip
                </Button>

            </div>

            <div style={{ width: '500px', height: '500px' }}>
                {/* Google Map div */}
                <GoogleMap
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
                    <Marker position={center} />
                    {directionsResponse && (
                        <DirectionsRenderer directions={directionsResponse} />
                    )}
                </GoogleMap>
            </div>
        </>
        //  <Box
        //     p={4}
        //     borderRadius='lg'
        //     m={4}
        //     bgColor='white'
        //     shadow='base'
        //     minW='container.md'
        //     zIndex='1'
        // >
        //     <HStack spacing={2} justifyContent='space-between'>
        //         <Box flexGrow={1}>
        //             <Autocomplete>
        //                 <Input type='text' placeholder='Origin' ref={originRef} />
        //             </Autocomplete>
        //         </Box>
        //         <Box flexGrow={1}>
        //             <Autocomplete>
        //                 <Input
        //                     type='text'
        //                     placeholder='Destination'
        //                     ref={destiantionRef}
        //                 />
        //             </Autocomplete>
        //         </Box>

        //         <ButtonGroup>
        //             <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
        //                 Calculate Route
        //             </Button>
        //             <IconButton
        //                 aria-label='center back'
        //                 icon={<FaTimes />}
        //                 onClick={clearRoute}
        //             />
        //         </ButtonGroup>
        //     </HStack>
        //     <HStack spacing={4} mt={4} justifyContent='space-between'>
        //         <Text>Distance: {distance} </Text>
        //         <Text>Duration: {duration} </Text>
        //         <IconButton
        //             aria-label='center back'
        //             icon={<FaLocationArrow />}
        //             isRound
        //             onClick={() => {
        //                 map.panTo(center)
        //                 map.setZoom(15)
        //             }}
        //         />
        //     </HStack>
        // </Box>
        // </Flex>
    )

}

export default MapAndSearch