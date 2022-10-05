import { Button } from "@chakra-ui/react"
import { Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

const UnloggedHomePage = () => {
    return (
        <div>
            <Container className={'justify-content-center align-items-center'}>
                <h1>Welcome to NOMBRE DE LA APP</h1>
                <h3>Get Started!</h3>
                <Container>
                    <Row>
                        <Button className="col" as={'span'}>
                            <Link to={'/signup'}> Sign Up</Link>
                        </Button>
                        <Button className="col" as={'span'}>
                            <Link to={'/login'}>Log In</Link>
                        </Button>

                    </Row>
                </Container>
            </Container>
        </div >
    )
}

export default UnloggedHomePage