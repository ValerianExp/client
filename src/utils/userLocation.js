

const userLocation = () => {
    var lat;
    var lng;
    navigator.geolocation.getCurrentPosition(
        (position) => {
            lat = position.coords.latitude
            lng = position.coords.longitude
            // console.log({ lat: lat, lng: lng })

        }
    )
    return { lat, lng }
}

export default userLocation