import { Col, Row, Toast, ToastContainer } from "react-bootstrap"

const ToastComponent = ({ errorMessage, show, setShow }) => {
    return (
        <ToastContainer position='top-start'>

            <Row>
                <Col xs={6}>
                    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide position={'top-end'}>
                        <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">ERROR</strong>
                        </Toast.Header>
                        <Toast.Body>{errorMessage}</Toast.Body>
                    </Toast>
                </Col>
            </Row>
        </ToastContainer>)
}

export default ToastComponent