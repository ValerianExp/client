import { createContext, useState, useEffect } from "react"

const PairContext = createContext();

const PositionPairWrapper = ({ children }) => {

    const [positionPair, setPositionPair] = useState([]);

    useEffect(() => {
        loadPairs();
    }, [])

    const loadPairs = () => {
        const pairs = [
            {
                name: "Marker 1",
                location: {
                    lat: 40.450045243559806,
                    lng: - 3.6757696628786736
                }
            },
            {
                name: "Marker 2",
                location: {
                    lat: 30.450045243559806,
                    lng: - 3.6757696628786736
                }
            },]
        setPositionPair(pairs);
    };


    return (
        <PairContext.Provider value={{ positionPair, loadPairs }}>
            {children}
        </PairContext.Provider>
    )
}

export { PairContext, PositionPairWrapper }