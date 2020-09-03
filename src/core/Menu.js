import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import {ButtonContainer} from './Button';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#ffffff" };
    }
};

const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs navbar-dark bg-dark py-2">
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/")}
                    to="/"
                >
                   <i className="fas fa-home fa-fw" ></i> Home
                </Link>
            </li>

            {isAuthenticated() && isAuthenticated().role === "User" && (
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/user/dashboard")}
                        to="/user/dashboard"
                    >
                        <i className="fas fa-users-cog"></i> Dashboard
                    </Link>
                </li>
            )}            

            {isAuthenticated() && isAuthenticated().role === "Admin" && (
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/admin/dashboard")}
                        to="/admin/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>
            )}

            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/signin")}
                            to="/signin"
                        >
                            <i class="fas fa-sign-in-alt"> Signin</i> 
                        </Link>
                    </li>                    
                </Fragment>
            )}
                        
                <li className="nav-item d-flex ml-auto ">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/create/order")}
                        to="/create/order"
                    >
                        Book Now
                    </Link>
                </li>
         

            {isAuthenticated() && (
                <li className="nav-item">
                    <span
                        className="nav-link"
                        style={{ cursor: "pointer", color: "#ffffff" }}
                        onClick={() =>
                            signout(() => {
                                history.push("/");
                            })
                        }
                    >
                       <i className="fas fa-sign-out-alt"></i> Signout
                    </span>
                </li>
            )}
        </ul>
    </div>
);

export default withRouter(Menu);