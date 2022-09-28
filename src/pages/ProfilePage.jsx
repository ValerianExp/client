import { Link } from "react-router-dom"

const ProfilePage = () => {
    return (
        <div>
            <p>Profile Page</p>
            <Link to='/profile'>Edit user</Link>
        </div>
    )
}

export default ProfilePage