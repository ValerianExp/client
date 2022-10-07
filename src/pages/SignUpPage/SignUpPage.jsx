import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ToastComponent from '../../components/Toast/Toast';
import authAxios from '../../services/authAxios';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import './SignUpPage.css'

const SignUpPage = () => {
    const [newUser, setNewUser] = useState({});
    const [userForm, setUserForm] = useState(new FormData());
    const [imageProfileLabelName, setImageProfileLabelName] = useState('Choose file');
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null)


    const createNewUser = (eventHTML) => {
        eventHTML.preventDefault();

        for (const key in newUser) {
            userForm.append(key, newUser[key]);
        }

        console.log(newUser)

        if (!newUser.email || !newUser.password || !newUser.username) {
            setErrorMessage('Email, username and password are required')
            setShow(true)
        }
        else {
            authAxios.signup(userForm)
                .then(() => {
                    navigate('/')
                })
                .catch((err) => {
                    setErrorMessage(err.response.data.errorMessage)
                    setShow(true)
                })
        }

    };

    const updateNewUser = (eventHTML) => {
        const { name, value } = eventHTML.target;

        // for (const key in newUser) {
        //     userForm.append(key, newUser[key]);
        // }

        // userForm.append(name, value);

        // console.log(userForm.get(name))
        setNewUser({ ...newUser, [name]: value });
    };

    const handleOnCheck = (eventHTLM) => {
        if (eventHTLM.target.checked) {
            setNewUser({ ...newUser, role: 'DRIVER' })
        } else {
            setNewUser({ ...newUser, role: 'CLIENT', carModel: null, numberPlate: null })

        }
    }

    const updateNewUserPhoto = e => {
        // const formData = new FormData();


        //TODO this is not working
        //importante

        userForm.append('avatar', e.target.files[0]);
        setImageProfileLabelName(e.target.files[0].name);
        //importante
        // updateNewUser({ target: { name: 'avatar', value: e.target.files[0].name } });
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
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.Label className="imageProfileLabel">
                            <div className='imageProfileLabelName'> <FileUploadIcon />{imageProfileLabelName}</div>
                            <Form.Control
                                type='file'
                                name='avatar'
                                onChange={updateNewUserPhoto}
                                className="inputImageProfile"
                            />
                        </Form.Label>
                    </Form.Group>

                    {newUser?.role === 'DRIVER' && <Form.Group className='mb-3' >
                        <Form.Label>Car model</Form.Label>
                        <Form.Control
                            name='carModel'
                            type='text'
                            placeholder='Car Model'
                            onChange={updateNewUser}
                        />
                        <Form.Label>Number Plate</Form.Label>
                        <Form.Control
                            name='numberPlate'
                            type='text'
                            placeholder='Number Plate'
                            onChange={updateNewUser}
                        />
                    </Form.Group>}

                    <Button className='signupBtn' type='submit'>
                        Sign Up
                    </Button>
                </Form >
                <p>Already have an account? <a href={'/signup'}>Log In </a></p>
            </Container>
            <ToastComponent errorMessage={errorMessage} show={show} setShow={setShow} />
        </>
    );
};

export default SignUpPage;