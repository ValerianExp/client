import DriverOnTrip from '../../components/DriverOnTrip/DriverOnTrip'
import ClientOnTrip from '../../components/ClientOnTrip/ClientOnTrip'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'

const OnTripPage = () => {
    const { isLoading, user, isLoggedIn } = useContext(AuthContext)

    return (
        !isLoading && isLoggedIn && user.role === 'DRIVER' ? <DriverOnTrip /> : <ClientOnTrip />
    )

}

export default OnTripPage