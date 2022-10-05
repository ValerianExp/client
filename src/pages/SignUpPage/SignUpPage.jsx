import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ToastComponent from '../../components/Toast/Toast';
import authAxios from '../../services/authAxios';
import './SignUpPage.css'

const SignUpPage = () => {
    const [newUser, setNewUser] = useState({});
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null)



    console.log('User', newUser)


    const createNewUser = (eventHTML) => {
        eventHTML.preventDefault();
        authAxios.signup(newUser)
            .then(() => {
                navigate('/')
            })
            .catch((err) => {
                setErrorMessage(err.response.data.errorMessage)
                setShow(true)
            })
    };

    const updateNewUser = (eventHTML) => {
        const { name, value } = eventHTML.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleOnCheck = (eventHTLM) => {
        if (eventHTLM.target.checked) {
            setNewUser({ ...newUser, role: 'DRIVER' })
        } else {
            setNewUser({ ...newUser, role: 'CLIENT', carModel: undefined })

        }
    }

    const updateNewUserPhoto = e => {
        const formData = new FormData();
        formData.append('avatar', e.target.files[0]);
        // console.log(e.target.files[0]);
        updateNewUser({ target: { name: 'avatar', value: formData.get('avatar') } });
        // authAxios.uploadPhoto(formData)
    }

    return (
        // TODO: avatar and carmodel
        <>
            <Container>

                <Form onSubmit={createNewUser}>
                    <Form.Group className='mb-3' >
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            name='username'
                            type='text'
                            placeholder='username'
                            onChange={updateNewUser}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            name='email'
                            type='text'
                            placeholder='pepe@pepe.com'
                            onChange={updateNewUser}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            name='password'
                            type='password'
                            placeholder='Password'
                            onChange={updateNewUser}
                        />
                    </Form.Group>

                    <Form.Group className='mb-3' >
                        <Form.Label>Are you a driver? </Form.Label>
                        <input
                            type="checkbox"
                            onChange={handleOnCheck}
                        />
                    </Form.Group>

                    <Form.Group className='mb-3' >
                        <Form.Label>ImageProfile</Form.Label>
                        <Form.Control
                            type='file'
                            name='avatar'
                            onChange={updateNewUser}
                        />
                    </Form.Group>

                    {newUser?.role === 'DRIVER' && <Form.Group className='mb-3' >
                        <Form.Label>Car model</Form.Label>
                        <Form.Control
                            name='carModel'
                            type='text'
                            placeholder='Car Model'
                            onChange={updateNewUser}
                        />
                    </Form.Group>}




                    <Button className='signupBtn' type='submit'>
                        Sign Up
                    </Button>
                </Form >
            </Container>
            <ToastComponent errorMessage={errorMessage} show={show} setShow={setShow} />
        </>
    );
};

export default SignUpPage;