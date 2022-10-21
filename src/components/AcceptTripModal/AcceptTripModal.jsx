import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import coordsToAddress from '../../utils/coordsToAddress';

const AcceptTripModal = ({ trip, showAccept, setShowAccept, cancelTrip, acceptTrip }) => {
    const handleClose = () => setShowAccept(false);
    const [fromDir, setFromDir] = useState(null)
    const [toDir, setToDir] = useState(null)
    useEffect(() => {
        coordsToAddress(trip.from.coordinates)
            .then((add) => {
                console.log(add)
                setFromDir(add)
            })
        console.log(coordsToAddress(trip.from.coordinates))
        coordsToAddress(trip.to.coordinates)
            .then((add) => setToDir(add))

    }, [trip])
    return (
        <>
            {trip &&
                <Modal show={showAccept} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{trip.client[0].username} has invited you on a trip!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        The trip goes:<br />
                        From: {fromDir}<br />
                        To: {toDir} <br />
                        Price: ${trip.price} (${trip.price / trip.client.length} per person)
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { cancelTrip(trip._id) }}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => { acceptTrip(trip._id) }}>
                            Accept Trip
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
        </>
    );
}

export default AcceptTripModal