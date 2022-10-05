import notFound from '../../images/404notfound.jpg'
const NotFoundPage = () => {
    return (
        <div style={{ height: '70vh' }} className="d-flex flex-column justify-content-center align-items-center ">
            <h1>PAGE NOT FOUND</h1>
            <img src={notFound} alt="" />
        </div>
    )

}

export default NotFoundPage