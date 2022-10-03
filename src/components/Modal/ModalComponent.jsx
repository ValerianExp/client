import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
// import Rating from '@mui/material/Rating';

const ModalComponent = () => {
    const { user } = useContext(AuthContext)
    const [value, setValue] = useState(0)
    return (
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>Rate the {user.role === 'DRIVER' ? 'client' : 'driver'}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {/* <Rating name="half-rating" defaultValue={2.5} precision={0.5} value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }} /> */}
                RATINGs
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" as={'span'} >
                    <Link to={'/'}>Close</Link>
                </Button>
                {/* <Button variant="primary">Save changes</Button> */}
            </Modal.Footer>
        </Modal.Dialog>
    );
}

export default ModalComponent;