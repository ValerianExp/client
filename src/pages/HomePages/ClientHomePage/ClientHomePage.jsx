import { useContext } from 'react';
import MapAndSearch from '../../../components/MapAndSearchBar/MapAndSearch';
import { AuthContext } from '../../../context/auth.context';


const ClientHomePage = ({ isLoaded }) => {
    return (
        <>
            <MapAndSearch isLoaded={isLoaded} />

        </>
    )
}

export default ClientHomePage