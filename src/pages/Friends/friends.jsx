import { useContext, useEffect, useState } from "react"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import userAxios from "../../services/userAxios"
import { AuthContext } from "../../context/auth.context"
import heart from '../../images/heart.png'
import filledHeart from '../../images/filled-heart.png'
import { Container, ListGroup } from "react-bootstrap"
import './friends.css'

const Friends = () => {
    const [users, setUsers] = useState(null)
    const { user, authentication } = useContext(AuthContext)

    useEffect(() => {
        userAxios.getAllUsers()
            .then((allUsers) => {
                console.log(allUsers)
                setUsers(allUsers)
            })
            .catch((err) => console.log(err.errorMessage))
    }, [])

    const updateFriend = (userId) => {
        userAxios.updateFriend(userId)
            .then((updatedUser) => {
                console.log(updatedUser)
                authentication()
            })
            .catch((err) => console.log(err))

    }

    return (
        <>
            {users && user
                ?
                <Container>

                    <h1 className="p-2">Add your friends!</h1>
                    <ListGroup>

                        {users.map((frienduser) => {
                            return (
                                <ListGroup.Item key={frienduser._id} className='d-flex justify-content-between'>{frienduser.username} <img src={user?.friends.some(e => e._id === frienduser._id) > 0 ? filledHeart : heart} onClick={() => updateFriend(frienduser._id)} className='heart' /></ListGroup.Item>
                            )
                        })}


                    </ListGroup>
                </Container>
                : <LoadingSpinner />}
        </>
    )

}

export default Friends