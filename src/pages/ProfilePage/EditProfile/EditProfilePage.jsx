import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../context/auth.context";

const EditProfilePage = () => {
    const { user } = useContext(AuthContext);
    const [newUser, setNewUser] = useState(user || {});

    useEffect(() => {
        setNewUser(user);
    }, [user]);

    const changeFieldHandle = (eventHTML) => {
        const { name, value } = eventHTML.target;
        console.log(name);
        console.log(value);
        setNewUser({ ...newUser, [name]: value });
    };

    return (
        user && newUser && <>

            <div className="container db-social">
                <div className="jumbotron jumbotron-fluid"></div>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-xl-11">
                            <div className="widget head-profile has-shadow">
                                <div className="widget-body pb-0">
                                    <div className="row d-flex align-items-center">
                                        <div className="col-xl-4 col-md-4 d-flex justify-content-lg-start justify-content-md-start justify-content-center col-sm-auto">
                                            <ul className="mt-xl-0 mt-lg-0 mt-5">
                                                <li>
                                                    <div className="counter">{user.rating ? "N/D" : user.rating}</div>
                                                    <div className="heading">Rating</div>
                                                </li>
                                                <li>
                                                    <div className="counter">{user?.oldtrips?.length}</div>
                                                    <div className="heading">Viajes</div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-xl-4 col-md-4 d-flex justify-content-center">
                                            <div className="image-default">
                                                <img src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" alt="..." className="img-fluid rounded-circle" />
                                            </div>
                                            <div className="infos">
                                                <h2><input type="text" className="form-control container" id="name" name="username" value={newUser.username} onChange={changeFieldHandle} /></h2>
                                                <div className="location">{user.role === "CLIENT" ? "Cliente" : "Conductor"}</div>
                                            </div>
                                        </div>
                                        <div className="optionsButtonsContainer">
                                            <a className="btn btn-primary text-nowrap" href="/profile/edit">Edit profile</a>
                                            <a className="btn btn-outline-danger text-nowrap" href="/">Delete profile</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <form className="form-profile" >
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control container" id="name" name="username" value={newUser.username} onChange={changeFieldHandle} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={newUser.email} onChange={changeFieldHandle} />
                </div>
            </form >
        </>
    )
}

export default EditProfilePage;