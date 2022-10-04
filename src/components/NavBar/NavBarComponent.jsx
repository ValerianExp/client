import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

const NavBarComponent = () => {
    const { logOut, user, isLoading } = useContext(AuthContext)
    console.log('USER', user)
    return (
        !isLoading &&
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as='span'>
                    <Link to='/'> React-Bootstrap</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as='span'>
                            <Link to='/signup'>Sign Up</Link>
                        </Nav.Link>
                        <Nav.Link as='span'>
                            <Link to='/login'>Log In</Link>
                        </Nav.Link>
                        <Nav.Link as='span'>
                            <Link to='/profile'>Profile</Link>
                        </Nav.Link>
                        <Nav.Link as='span' onClick={() => logOut()}>
                            Log Out
                        </Nav.Link>
                        {user?.inProcess && <Nav.Link as='span'>
                            <Link to={`/trip/${user.currentTrip}`}>Current Trip</Link>
                        </Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );

}

export default NavBarComponent