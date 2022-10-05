import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import UnloggedHomePage from './UnloggedHomePage/UnloggedHomePage'
import DriverHomePage from './DriverHomePage/DriverHomePage'
import ClientHomePage from './ClientHomePage/ClientHomePage'
import { useJsApiLoader } from "@react-google-maps/api"

const HomePage = () => {
    const { user } = useContext(AuthContext)
    if (!user) return < UnloggedHomePage />
    else if (user.role === 'DRIVER') return < DriverHomePage />
    else return <ClientHomePage />

}

export default HomePage