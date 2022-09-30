import { useContext } from 'react';
import MapAndSearch from '../../../components/MapAndSearchBar/MapAndSearch';
import { AuthContext } from '../../../context/auth.context';


const ClientHomePage = () => {
    const { user } = useContext(AuthContext)
    return (
        <>
            {/* <p>{user ? user.username : 'No hay user parsero'}</p> */}
            <MapAndSearch />

        </>
    )
}

export default ClientHomePage