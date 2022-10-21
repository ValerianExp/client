import { useEffect, useState } from "react";
import { Col, Row, Toast, ToastContainer } from "react-bootstrap"
import icon from '../../images/planning.png'

const TripToast = ({ duration, distance, price, show, passengers, setShow }) => {
    const toggleShow = () => setShow(!show);

    return (
        <ToastContainer position={'top-start'} style={{ fontFamily: 'monospace', fontSize: '15px', opacity: '1 !important' }}>
            <Row>
                <Col xs={6}>
                    <Toast show={show} onClose={toggleShow} bg='light' >
                        <Toast.Header >
                            <img
                                src={icon}
                                className="rounded me-2 w-25"
                                alt=""
                            />
                            <strong className="me-auto" style={{ color: '#ADB5BD' }}>Trip details</strong>
                        </Toast.Header>
                        <Toast.Body >
                            <p>DURATION: {duration}</p>
                            <p>DISTANCE: {distance}</p>
                            <p>PRICE: ${price} {passengers.length > 1 && `($ ${price / passengers.length} per person)`}</p>
                        </Toast.Body>
                    </Toast>
                </Col>
            </Row>
        </ToastContainer>)
}



export default TripToast