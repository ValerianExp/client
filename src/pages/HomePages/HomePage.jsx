import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import UnloggedHomePage from './UnloggedHomePage/UnloggedHomePage'
import DriverHomePage from './DriverHomePage/DriverHomePage'
import ClientHomePage from './ClientHomePage/ClientHomePage'

const HomePage = () => {
    const { user } = useContext(AuthContext)
    return (
        !user ? <UnloggedHomePage /> : user.role === 'DRIVER' ? <DriverHomePage /> : <ClientHomePage />)
}

export default HomePage