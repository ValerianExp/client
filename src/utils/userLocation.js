

const userLocation = () => {
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude
                const lng = position.coords.longitude
                res({ lat, lng })
                // console.log({ lat: lat, lng: lng })
            }, (err) => {
                if (err) {
                    rej(err);
                }
            }
        )
    })
}

export default userLocation