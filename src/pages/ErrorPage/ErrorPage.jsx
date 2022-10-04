import { useParams } from "react-router-dom"

const ErrorPage = () => {
    const { errorMessage } = useParams()
    console.log(errorMessage)
    return (
        <div style={{ color: 'red' }}>{errorMessage}</div>
    )

}

export default ErrorPage