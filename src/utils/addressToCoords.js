const addressToCoords = async (placeId) => {
    try {
        // eslint-disable-next-line no-undef
        const geocoder = new google.maps.Geocoder()
        const { results } = await geocoder.geocode({ placeId: `${placeId}` })
        return { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() }

    } catch (err) {
        console.log(err)
    }

}

export default addressToCoords