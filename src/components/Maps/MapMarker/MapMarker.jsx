import { Marker, InfoWindow } from '@react-google-maps/api'
import { useState, useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { PairContext } from '../../../context/positionPair.context'

const MapMarker = () => {

    const [selected, setSelected] = useState({})

    const { positionPair } = useContext(PairContext);

    const onSelect = item => {
        setSelected(item);
        console.log(item);
    }

    return (
        <>
            {positionPair.map(item => {
                return (
                    <Marker
                        key={item.name}
                        position={item.location}
                        onClick={() => onSelect(item)}
                    />
                )
            })}
        </>
    )
}

export default MapMarker