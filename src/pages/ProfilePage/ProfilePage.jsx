import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";


import './ProfilePage.css'

const ProfilePage = () => {
    const { user } = useContext(AuthContext);


    console.log("usuario->", user);

    const media = () => {
        if (user.rating.length === 0) return "N/D";
        return (user.rating.reduce((acc, curr) => acc + curr) / user.rating.length).toFixed(2) + " ★";
    }

    return (
        user && (
            <>
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
                                                    {/* <li>
                                                    <div className="counter">246</div>
                                                    <div className="heading">Friends</div>
                                                </li> */}
                                                    <li>
                                                        <div className="counter">
                                                            {media(user.rating)}
                                                        </div>
                                                        <div className="heading">Rating</div>
                                                    </li>
                                                    <li>
                                                        <div className="counter">
                                                            {user?.oldtrips?.length}
                                                        </div>
                                                        <div className="heading">Viajes</div>
                                                    </li>
                                                    <li>
                                                        <div className="counter">
                                                            {user?.role === "DRIVER" && <>
                                                                {user.carModel}
                                                            </>}
                                                        </div>
                                                        <div className="heading">{user?.numberPlate}</div>
                                                    </li>

                                                </ul>
                                            </div>
                                            <div className="col-xl-4 col-md-4 d-flex justify-content-center">
                                                <div className="image-default">
                                                    <img
                                                        className="rounded-circle"
                                                        src={
                                                            user.avatar
                                                                ? user.avatar
                                                                : "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                                                        }
                                                        alt="Avatar or user"
                                                    />
                                                </div>
                                                <div className="infos">
                                                    <h2>{user.username}</h2>
                                                    <div className="location">
                                                        {user.role === "CLIENT" ? "Cliente" : "Conductor"}
                                                    </div>
                                                </div>

                                            </div>
                                            {/* <div className="col-xl-4 col-md-4 d-flex justify-content-lg-end justify-content-md-end justify-content-center" style={{ marginBottom: "20px" }}>
                                            <div className="follow">
                                                <a className="btn btn-shadow" href="/"><i className="la la-user-plus"></i>Add Friend</a>
                                                <div className="actions dark">
                                                    <div className="dropdown">
                                                        <button type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="btn dropdown-toggle">
                                                            <i className="la la-ellipsis-h"></i>
                                                        </button>
                                                        <ul className="dropdown-menu" x-placement="bottom-start" style={{ display: "none", position: "absolute", willChange: "transform", top: "0px", left: "0px", transform: "translate3d(0px, 35px, 0px)" }}>
                                                            <li><a href="/" className="dropdown-item">Edit Profile</a></li>
                                                            <li><a href="/" className="dropdown-item">Delete Profile</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                            <div className="optionsButtonsContainer">
                                                <Link
                                                    className="btn btn-primary text-nowrap"
                                                    to="/profile/edit"
                                                >
                                                    Edit profile
                                                </Link>
                                                <Link
                                                    className="btn btn-outline-danger text-nowrap"
                                                    href="/"
                                                >
                                                    Delete profile
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    );
}

export default ProfilePage