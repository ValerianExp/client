const coordsToAddress = async (coords) => {
    try {
        // eslint-disable-next-line no-undef
        const geocoder = new google.maps.Geocoder()
        const { results } = await geocoder.geocode({
            location: { lat: coords[0], lng: coords[1] }
        })
        return { results }

    } catch (err) {
        console.log(err)
    }

}

export default coordsToAddress