const coordsToAddress = async (coords) => {
    try {
        console.log({ lat: coords[1], lng: coords[0] })
        // eslint-disable-next-line no-undef
        const geocoder = new google.maps.Geocoder()
        const { results } = await geocoder.geocode({
            location: { lat: coords[1], lng: coords[0] }
        })
        console.log(results[0].formatted_address)
        return results[0].formatted_address

    } catch (err) {
        console.log(err)
    }
}

export default coordsToAddress