import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import Card from "../core/Card";
import { isAuthenticated } from "../auth";
import { getOrders } from "../core/apiCore";


const UserDashboard = () => {   

    const [orders, setOrders] = useState([]); 
    const [loading, setLoading] = useState(false);

    const  user = isAuthenticated()

    const initOrders = () => {
        getOrders().then(data => {
            if (!data) {
              //  setError(data.error);
                setLoading(true);
            } else {
                setOrders(data);
                setLoading(false);
            }
        });
    };

    useEffect(() => {             
        initOrders();      
    }, []);

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );
   
    const userLinks = () => {
        return (
            <div className="card mt-4">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/user/reservation">
                            My Reservation
                        </Link>
                    </li>                   
                    <li className="list-group-item">
                        <Link className="nav-link" to="/user/profile">
                            Update Profile
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const userInfo = () => {
        return (
            <div className="card mb-5 mt-4">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group text-muted">
                    <li className="list-group-item">You are: {user.lastName} {user.firstName}</li>
                    <li className="list-group-item">Username: {user.username}</li>  
                    <li className="list-group-item">Registered with: User</li>  
                     <li className="list-group-item">
                        <Link className="text-danger" to="/user/profile">
                            Update Profile
                        </Link>
                    </li>                  
                </ul>
            </div>
        );
    };

     const orderInfo = () => {
        return (
            <div className="mt-4">
                <h3 className="">Reservation Information</h3>
                <div className="row">
                    {orders.map((data, o) => (
                      <Card key={o} order={data} />
                    ))}
                </div>
            </div>
        );
    };
   

    return (
        <Layout
            title="Dashboard"
            description={`G'day ${user.firstName} ${user.lastName}!`}
            className="container-fluid"
        >
            <div className="main main-raised TextStyle">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-3"> {userInfo()}  </div>
                    <div className="col-md-8">
                        {showLoading()}
                        {orderInfo()}   <br />  
                                          
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UserDashboard;