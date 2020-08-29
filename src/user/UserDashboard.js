import React from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";

const UserDashboard = () => {   
    const  user = isAuthenticated()
   
    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/user/reservation">
                            My Reservation
                        </Link>
                    </li>                   
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/profile">
                            Update Profile
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">User Name</li>
                    <li className="list-group-item">User Email</li>  
                    <li className="list-group-item">User Registration</li>                    
                </ul>
            </div>
        );
    };
   

    return (
        <Layout
            title="Dashboard"
            description={`G'day User!`}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-md-3">{userLinks()}</div>
                <div className="col-md-9">
                    {userInfo()}                    
                </div>
            </div>
        </Layout>
    );
};

export default UserDashboard;