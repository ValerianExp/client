import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import MapMarker from './MapMarker/MapMarker';

const MapContainer = () => {

    // const KEY = "AIzaSyAIQkhSla3_7bDxjMflVcaQDfxQbSWCPEg";


    const mapStyles = {
        height: "40vh",
        width: "60%",
    }

    const defaultCenter = {
        lat: 40.450045243559806,
        lng: - 3.6757696628786736
    }

    return (

        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>

            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={12}
                center={defaultCenter}>
                <MapMarker />

            </GoogleMap>

        </LoadScript>
    )
}

export default MapContainer

