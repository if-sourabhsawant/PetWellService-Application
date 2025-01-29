import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../redux/store';


export default function NavBar() {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userInfo);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const dashboardUrl = useSelector((state) => state.user.dashboardUrl);
    const navigate = useNavigate();


    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };
    return (
        <div>

            <nav className="navbar navbar-expand-lg bg-body-tertiary border">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Pet Well Services</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav mt-0 me-5">
                            {isAuthenticated ?
                                <>
                                    {isAuthenticated && <div className='nav-item d-flex flex-column nav-item me-3'>
                                        <Link className='nav-link' to={dashboardUrl}>Welcome {user.firstName}</Link>

                                    </div>}
                                    <li className="nav-item">
                                        <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                                    </li> </>
                                :
                                (<>
                                    <li className="nav-item dropdown  me-3">
                                        <button className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Registration
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" to="user-registration">User Registration</Link></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><Link className="dropdown-item" to="veterinary-registration">Veterinary Registration</Link></li>
                                            <li><hr className="dropdown-divider" /></li>

                                            <li><Link className="dropdown-item" to="sitter-registration">Sitter Registration</Link></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><Link className="dropdown-item" to="groomer-registration">Groomer Registration</Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="login">Login</Link>
                                    </li> </>)}
                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    )
}
