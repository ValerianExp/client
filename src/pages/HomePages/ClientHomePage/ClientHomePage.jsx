import { useContext } from 'react';
import MapAndSearch from '../../../components/MapAndSearchBar/MapAndSearch';
import { AuthContext } from '../../../context/auth.context';


const ClientHomePage = () => {
    const { user } = useContext(AuthContext)
    return (
        //TODO no se por que no funcionan los dos a la vez, creo que es porque usan los dos la api de google y se rayan mis colegas
        <>
            {/* <p>{user ? user.username : 'No hay user parsero'}</p> */}
            <MapAndSearch />

        </>
    )
}

export default ClientHomePage