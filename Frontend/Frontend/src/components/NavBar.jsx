import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/store";

export default function NavBar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dashboardUrl = useSelector((state) => state.user.dashboardUrl);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login", { state: { redirect: true } });
    dispatch(logout());
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary  border" data-bs-theme="dark">
        <div className="container-fluid">
        <Link className="navbar-brand" to="/">
            <img src="https://t4.ftcdn.net/jpg/02/75/19/67/360_F_275196731_aFVN6R7M2CipYdQXyUAMUMtqMuQ5IoJi.jpg" alt="Pet Well Services" style={{ borderRadius: "60%", width: "60px", height: "60px" }} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {![2,3,4,5].includes(parseInt(user?.role?.roleId)) && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/veterinarians">
                      Veterinarians
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/sitters">
                      Sitters
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/groomers">
                      Groomers
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/food-shops">
                      Food Shops
                    </Link>
                  </li>
                </>
              )}
            </ul>

            <ul className="navbar-nav mt-0 me-5">
              {isAuthenticated ? (
                <>
                  {isAuthenticated && (
                    <div className="nav-item d-flex flex-column nav-item me-3">
                      <Link className="nav-link" to={dashboardUrl}>
                        Welcome {user.firstName}
                      </Link>
                    </div>
                  )}
                  <li className="nav-item">
                    <button className="btn btn-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>{" "}
                </>
              ) : (
                <>
                  <li className="nav-item dropdown  me-3">
                    <button className="btn btn-outline-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="true">
                      Registration
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/register/user">
                          User Registration
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/register/veterinary">
                          Veterinary Registration
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>

                      <li>
                        <Link className="dropdown-item" to="/register/sitter">
                          Sitter Registration
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/register/groomer">
                          Groomer Registration
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/register/food-shop">
                          Food Registration
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link className=" btn btn-outline-warning " aria-current="page" to="login">
                      Login
                    </Link>
                  </li>{" "}
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
