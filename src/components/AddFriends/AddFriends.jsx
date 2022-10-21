import { Container, ListGroup } from "react-bootstrap"
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"
import heart from '../../images/heart.png'
import filledHeart from '../../images/filled-heart.png'
import './AddFriends.css'

const AddFriends = ({ user, users, updateFriend }) => {
    return (
        <>
            {users && user
                ?
                <Container>

                    <h1 className="p-2">Add your friends!</h1>
                    <ListGroup>

                        {users.map((frienduser) => {
                            return (
                                <ListGroup.Item key={frienduser._id} className='d-flex justify-content-between'>
                                    <img src={frienduser.avatar} alt="" className="friend-avatar" />
                                    @{frienduser.username}
                                    <img src={user?.friends.some(e => e._id === frienduser._id) > 0 ? filledHeart : heart} onClick={() => updateFriend(frienduser._id)} className='heart' />
                                </ListGroup.Item>
                            )
                        })}


                    </ListGroup>
                </Container>
                : <LoadingSpinner />}
        </>
    )

}

export default AddFriends