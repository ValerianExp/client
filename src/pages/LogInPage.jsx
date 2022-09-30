import { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import authAxios from '../services/authAxios';
import { AuthContext } from '../context/auth.context';


const LogInPage = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate()
    const { storeToken, authentication } = useContext(AuthContext);


    const login = (eventHTML) => {
        eventHTML.preventDefault();
        authAxios.login(user).then((response) => {
            storeToken(response.token);
            authentication();
            navigate('/')
        })
    };

    const updateUser = (eventHTML) => {
        const { name, value } = eventHTML.target;
        setUser({ ...user, [name]: value });
    };

    return (
        <Form onSubmit={login}>
            <Form.Group className='mb-3' >
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='pepe@pepe.com'
                    onChange={updateUser}
                    name='email'
                />
            </Form.Group>
            <Form.Group className='mb-3' >
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    name='password'
                    onChange={updateUser}
                />
            </Form.Group>
            <Button variant='primary' type='submit'>
                Log In
            </Button>
        </Form>
    );
};

export default LogInPage;