import { Card, Container, Row } from 'react-bootstrap'
import averageStars from '../../utils/averageStars'
import './ClientCard.css'

const ClientCard = ({ client }) => {
    return (
        <>
            <Card style={{ width: '50%' }}>

                <Card.Body >
                    <Row >
                        <Card.Title>Client:</Card.Title>
                        <Card.Img src={client.avatar} className={'cardAvatar col'} />
                        <div className='col d-flex flex-column justify-content-center align-items-center'>
                            <Card.Text>
                                <b>@{client.username}</b><br />
                                {averageStars(client.rating)}★
                            </Card.Text>
                        </div>
                    </Row>
                </Card.Body>


            </Card>
        </>
    )
}

export default ClientCard



// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';

// function BasicExample() {
//     return (
//         <Card style={{ width: '18rem' }}>
//             <Card.Img variant="top" src="holder.js/100px180" />
//             <Card.Body>
//                 <Card.Title>Card Title</Card.Title>
//                 <Card.Text>
//                     Some quick example text to build on the card title and make up the
//                     bulk of the card's content.
//                 </Card.Text>
//                 <Button variant="primary">Go somewhere</Button>
//             </Card.Body>
//         </Card>
//     );
// }

// export default BasicExample;