import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { getOrderByName } from "../core/apiCore";
import {ButtonContainer} from '../core/Button';

const UserDashboard = () => {   
    const [orders, setOrders] = useState([]);    
    const [loading, setLoading] = useState(false);

    const  user = isAuthenticated()

    const initOrders = () => {
        let name = (user.firstName + " " + user.lastName)
        getOrderByName(name).then(data => {
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
   
    const userInfo = () => {
        return (
            <div className="card mb-5 mt-4 shadow">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group text-muted">
                    <li className="list-group-item">You are: {user.lastName} {user.firstName}</li>
                    <li className="list-group-item">Username: {user.username}</li>  
                    <li className="list-group-item">Registered with: User</li>  
                     <li className="list-group-item">
                        <Link  to={`/profile/${user.id}`}>
                            <ButtonContainer> Update Profile </ButtonContainer>
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
                    {orders.map((order, u) => (
                        <div key={u} className="card container-fluid TextStyle">
                            <div className="row text-muted" style={{ borderBottom: "2px solid indigo"}}>
                                <div className="col-9 mx-auto col-lg-2  my-2">{order.name}</div>
                                <div className="col-9 mx-auto col-lg-3  my-2">{order.orderProduct}</div>
                                <div className="col-9 mx-auto col-lg-4  my-2">{order.orderLocation}</div>
                                <div className="col-9 mx-auto col-lg-3  my-2">{order.dateOfReservation} / {order.available}</div>
                            </div>
                        </div>
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