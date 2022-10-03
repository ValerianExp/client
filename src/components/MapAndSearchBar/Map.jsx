import { DirectionsRenderer, GoogleMap, Marker } from "@react-google-maps/api"

const Map = ({ directionsResponse, center, setMap }) => {
    return (
        <>
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

                {directionsResponse ? (
                    <DirectionsRenderer directions={directionsResponse} />
                ) : <Marker position={center} icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }} />}
            </GoogleMap>
        </>
    )

}

export default Map