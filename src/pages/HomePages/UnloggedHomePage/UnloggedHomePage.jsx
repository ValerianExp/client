import { Button } from "@chakra-ui/react"
import { Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import '../HomePage.css'

const UnloggedHomePage = () => {
    return (
        <div className={'d-flex flex-column justify-content-center align-items-center text-center homeDiv'}>
            <Container  >
                <h1 className="title">Welcome to CarScape</h1>
                <h3 className="subtitle">Get Started!</h3>
                <Container>
                    <Row>
                        <Button className="col m-2" as={'span'}>
                            <Link to={'/signup'}> Sign Up</Link>
                        </Button>
                        <Button className="col m-2" as={'span'}>
                            <Link to={'/login'}>Log In</Link>
                        </Button>

                    </Row>
                </Container>
            </Container>
        </div >
    )
}

export default UnloggedHomePage