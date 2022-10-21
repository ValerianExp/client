import { useContext, useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ToastComponent from "../../../components/Toast/Toast";
import { AuthContext } from "../../../context/auth.context";
import userAxios from "../../../services/userAxios";

const EditProfilePage = () => {
    const { user } = useContext(AuthContext);
    const [newUser, setNewUser] = useState(user || {});
    const [userForm, setUserForm] = useState(new FormData());

    // Notif
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            const { email, username, _id } = user;
            setNewUser({ email, username, _id });
        }
    }, [user]);

    useEffect(() => {
        console.log('userForm->', userForm.getAll);
    }, [userForm]);

    const changeFieldHandle = (eventHTML) => {
        const { name, value } = eventHTML.target;
        console.log(name);
        console.log(value);
        newUser.avatar = undefined;
        setNewUser({ ...newUser, [name]: value });
    };

    const updateNewUserPhoto = e => {
        e.preventDefault();
        const file = e.target.files[0];

        userForm.append('avatar', file);
    };

    const deleteUserHandle = (e) => {
        // e.preventDefault();
        console.log("borrando?");
        userAxios
            .deleteUser(user._id)
            .then((response) => {
                console.log(response);
                // setErrorMessage(response.data.message);
                // setShow(true);
            })
            .catch((err) => {
                console.log(err);
                setErrorMessage(err.response.data.message);
                // setShow(true);
            });
    };

    const submitHandle = (eventHTML) => {
        eventHTML.preventDefault();
        console.log("newUser->", newUser);

        for (const key in newUser) {
            if (key !== 'avatar') {
                userForm.append(key, newUser[key]);
            }
        }

        console.log('newUser ->', newUser);
        // console.log('userForm ->: ', userForm);

        userAxios
            .editUser(userForm)
            .then((response) => {
                console.log(response);
                navigate('/profile')
            })
            .catch((err) => {
                setErrorMessage(err.response.data.errorMessage)
                setShow(true)
            })

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
                                            <Link className="btn btn-primary text-nowrap" to="/profile/edit">Edit profile</Link>
                                            <Link className="btn btn-outline-danger text-nowrap" to="/profile/delete" onClick={deleteUserHandle}>Delete profile</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <form className="form-profile d-flex align-items-center justify-content-center">
                <button type="submit" className="btn btn-primary " onClick={submitHandle}>Done editing</button>
                <div className="form-group">
                    <label htmlFor="name" hidden>Name</label>
                    <input type="text" className="form-control container" id="name" name="username" value={newUser.username} onChange={changeFieldHandle} hidden />
                </div>
                <div className="form-group">
                    <label htmlFor="email" hidden>Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={newUser.email} onChange={changeFieldHandle} hidden />
                </div>
                <div className='imageProfileLabelName' hidden>Profile</div>
                <input
                    type='file'
                    name='avatar'
                    onChange={updateNewUserPhoto}
                    hidden
                />
            </form >

            <ToastComponent errorMessage={errorMessage} show={show} setShow={setShow} />
        </>
    )
}

export default EditProfilePage;