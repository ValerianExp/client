import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import UnloggedHomePage from './UnloggedHomePage/UnloggedHomePage'
import DriverHomePage from './DriverHomePage/DriverHomePage'
import ClientHomePage from './ClientHomePage/ClientHomePage'
import { useJsApiLoader } from "@react-google-maps/api"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"

const HomePage = () => {
    const { user, isLoading } = useContext(AuthContext)
    if (isLoading) return <LoadingSpinner />
    if (!user) return < UnloggedHomePage />
    else if (user.role === 'DRIVER') return < DriverHomePage />
    else return <ClientHomePage />

}

export default HomePage