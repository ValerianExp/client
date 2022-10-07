import { Card, Row } from "react-bootstrap"
import averageStars from "../../utils/averageStars"

const DriverCard = ({ driver }) => {
    console.log('DRIVER', driver)
    return (
        <>
            <Card style={{ width: '50%' }}>

                <Card.Body >
                    <Row >
                        <Card.Title>Driver:</Card.Title>
                        <Card.Img src={driver.avatar} className={'cardAvatar col'} />
                        <div className='col d-flex flex-column justify-content-center align-items-center'>
                            <Card.Text>
                                <b>@{driver.username}</b><br />
                                {driver.rating && averageStars(driver.rating)}★ <br />
                                {driver.carModel}<br />
                                {driver.numberPlate}
                            </Card.Text>
                        </div>
                    </Row>
                </Card.Body>


            </Card>
        </>
    )

}

export default DriverCard