import { Card, Container, Row } from 'react-bootstrap'
import averageStars from '../../utils/averageStars'
import './ClientCard.css'

const ClientCard = ({ client }) => {
    return (
        <>
            <Card style={{ width: '50%' }}>

                <Card.Img src={client.avatar} className={'cardAvatar'} />
                <Card.Body >
                    <Card.Title>@{client.username}</Card.Title>
                    <Card.Text>
                        {averageStars(client.rating)}★
                    </Card.Text>
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