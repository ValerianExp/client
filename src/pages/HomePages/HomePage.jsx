import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import UnloggedHomePage from './UnloggedHomePage/UnloggedHomePage'
import DriverHomePage from './DriverHomePage/DriverHomePage'
import ClientHomePage from './ClientHomePage/ClientHomePage'
import { useJsApiLoader } from "@react-google-maps/api"

const HomePage = () => {
    const { user } = useContext(AuthContext)
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ['places']
    })

    if (!user) return < UnloggedHomePage />
    else if (user.role === 'DRIVER') return < DriverHomePage isLoaded={isLoaded} />
    else return <ClientHomePage isLoaded={isLoaded} />

}

export default HomePage