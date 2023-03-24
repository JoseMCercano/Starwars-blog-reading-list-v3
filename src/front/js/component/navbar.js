import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

import ChossenFavorite from "./Favorites";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  let navigate = useNavigate();
  // Calls flux logout
  const doLogout = () => {
    //false
    let onLogged = actions.logout();

    if (!onLogged) {
      //true
      navigate("/login");
    }
  };

  return (
    <div className="sticky-top">
      <nav className="navbar">
        <div className="container">
          <Link to="/" style={{ textDecoration: "none" }}>
            <img
              className="logoNavBar text-center"
              src="https://1000marcas.net/wp-content/uploads/2019/12/logo-StarWars.png"
            />
          </Link>

          <div className="ml-auto">
            {!store.auth ? (
              <Link to="/login">
                <button className="btn btn-outline-light m-2">Login</button>
              </Link>
            ) : null}{" "}
            {store.auth ? (
              <Link to="/">
                <button
                  className="btn btn-outline-light m-2"
                  type="button"
                  onClick={doLogout}
                >
                  Log out
                </button>
              </Link>
            ) : null}
            {!store.auth ? (
              <Link to="/signup">
                <button className="btn btn-outline-light m-2">Sign Up</button>
              </Link>
            ) : null}{" "}
          </div>
        </div>
      </nav>

      {/* Segundo NAV */}

      <nav className="navBar2 navbar  ">
        <div className="container-fluid  d-flex justify-content-center">
          <li className="me-5 nav-item  ">
            <Link to="/characters" className="linkToView">
              Characters
            </Link>
          </li>
          <li className="me-5 nav-item ">
            <Link to="/planets" className="linkToView">
              Planets
            </Link>
          </li>
          <li className="me-5 nav-item ">
            <Link to="/vehicles" className="linkToView">
              Vehicles
            </Link>
          </li>
          {/* this seach in the store the auth, if is true and user is logged then will show the favorites button */}
          {store.auth ? (
            <div className="me-5 nav-item btn-group dropright">
              <button
                className="linkToView btn   dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Favorites {store.favorites.length}
              </button>
              <ul className="dropContainer dropdown-menu">
                <ChossenFavorite />
              </ul>
            </div>
          ) : null}{" "}
        </div>
      </nav>
    </div>
  );
};
