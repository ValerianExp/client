import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import authAxios from '../services/authAxios';

const SignUpPage = () => {
    const [newUser, setNewUser] = useState({});
    const navigate = useNavigate()


    const createNewUser = (eventHTML) => {
        eventHTML.preventDefault();
        authAxios.signup(newUser)
            .then(() => {
                navigate('/')
            })
            .catch((err) => console.log(err))
    };

    const updateNewUser = (eventHTML) => {
        const { name, value } = eventHTML.target;
        setNewUser({ ...newUser, [name]: value });
    };

    return (
        <Form onSubmit={createNewUser}>
            <Form.Group className='mb-3' >
                <Form.Label>Username</Form.Label>
                <Form.Control
                    name='username'
                    onChange={updateNewUser}
                    type='text'
                    placeholder='username'
                />
            </Form.Group>
            <Form.Group className='mb-3' >
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='pepe@pepe.com'
                    onChange={updateNewUser}
                    name='email'
                />
            </Form.Group>
            <Form.Group className='mb-3' >
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    name='password'
                    onChange={updateNewUser}
                />
            </Form.Group>
            <Button variant='primary' type='submit'>
                Sign Up
            </Button>
        </Form>
    );
};

export default SignUpPage;