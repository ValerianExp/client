import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import authAxios from '../services/authAxios';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

const SignUpPage = () => {
    const [newUser, setNewUser] = useState({});
    const navigate = useNavigate()

    console.log('User', newUser)


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




            <Button variant='primary' type='submit'>
                Sign Up
            </Button>
        </Form >
    );
};

export default SignUpPage;