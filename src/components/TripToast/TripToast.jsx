import { Col, Row, Toast, ToastContainer } from "react-bootstrap"

const TripToast = ({ duration, distance, price, show }) => {


    return (<ToastContainer position={'top-start'} style={{ fontFamily: 'monospace', fontSize: '15px', opacity: '1' }}>
        <Row>
            <Col xs={6}>
                <Toast show={show}  >
                    <Toast.Header>
                        {/* <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        /> */}
                        <strong className="me-auto" style={{ color: '#ADB5BD' }}>Trip details</strong>
                    </Toast.Header>
                    <Toast.Body>
                        <p>DURATION: {duration}</p>
                        <p>DISTANCE: {distance}</p>
                        <p>PRICE: {price}$ </p>
                    </Toast.Body>
                </Toast>
            </Col>
        </Row>
    </ToastContainer>)
}



export default TripToast