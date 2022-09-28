import { useContext } from "react"
import { AuthContext } from "../context/auth.context"

const HomePage = () => {
    const { user } = useContext(AuthContext)
    return (
        <>
            <div>Home Page</div>
            <p>{user?.username}</p>
        </>
    )
}

export default HomePage