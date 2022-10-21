import { useContext, useEffect, useState } from "react"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import userAxios from "../../services/userAxios"
import { AuthContext } from "../../context/auth.context"
import { Container, ListGroup } from "react-bootstrap"
import './friends.css'
import AddFriends from "../../components/AddFriends/AddFriends"
import FriendsSearchBar from "../../components/FriendsSearchBar/FriendsSearchBar"

const Friends = () => {
    const [users, setUsers] = useState(null)
    const [allUsers, setAllUsers] = useState(null)
    const { user, authentication } = useContext(AuthContext)

    useEffect(() => {
        userAxios.getAllUsers()
            .then((allUsers) => {
                console.log(allUsers)
                setUsers(allUsers)
                setAllUsers(allUsers)
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
        <Container>
            <FriendsSearchBar allUsers={allUsers} setUsers={setUsers} />
            <AddFriends user={user} users={users} updateFriend={updateFriend} />
        </ Container>
    )

}

export default Friends