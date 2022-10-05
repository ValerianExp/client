import { useContext, useState } from 'react';
import { Col, Container, Form, Row, Toast } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import authAxios from '../../services/authAxios';
import { AuthContext } from '../../context/auth.context';
import { Button } from '@chakra-ui/react';
import ToastComponent from '../../components/Toast/Toast';



const LogInPage = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate()
    const { storeToken, authentication } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null)


    const login = (eventHTML) => {
        eventHTML.preventDefault();
        authAxios.login(user).then((response) => {
            storeToken(response.token);
            authentication();
            navigate('/')
        })
            .catch((err) => {
                console.log(err.response.data.errorMessage)
                setErrorMessage(err.response.data.errorMessage)

                setShow(true)
            })
    };


    const updateUser = (eventHTML) => {
        const { name, value } = eventHTML.target;
        setUser({ ...user, [name]: value });
    };

    return (
        <>
            <Container>
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
                    <Button type='submit'>
                        Log In
                    </Button>

                    <p>Don't have an account yet? <a href={'/signup'}>Sign Up</a></p>

                </Form>
            </Container>
            <ToastComponent errorMessage={errorMessage} show={show} setShow={setShow} />
        </>
    );
};

export default LogInPage;