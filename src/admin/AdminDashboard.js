import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { getOrderByDate, deleteOrder } from "../core/apiCore";
import Card from "../core/Card";
import { isAuthenticated } from "../auth";
import { getLocalLocation } from "./locationHelper";
import moment from "moment"; 
import {ButtonContainer} from '../core/Button';

const AdminDashboard = () => {    
    const [dateOfReservation, setDate] = useState("");
    const [orders, setOrders] = useState([]);    
    const [local, setLocal] = useState("");
    const [loading, setLoading] = useState(false);

    const  user = isAuthenticated();

    const initOrders = () => {
        var today = new Date();
        today = moment().format('YYYY-MM-DD');        
        getOrderByDate(today).then(data => {
            if (!data) {
              //  setError(data.error);
                setLoading(true);
            } else {
                setOrders(data);
                setLoading(false);
            }
        });
    };

    const destroy = orderId => { 
        deleteOrder(orderId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                initOrders();
            }
        });
    };

    useEffect(() => {              
        initOrders();  
        setLocal(getLocalLocation('location'));      
    }, []);

     const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    const handleChange = e => {        
        setDate(e.target.value); 
    };
        
    const clickSubmit = e => {
        e.preventDefault();              
        getOrderByDate(dateOfReservation).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        });
    };

    const searchDateForm = () => (
        <form className="mt-2 d-flex justify-content-left" onSubmit={clickSubmit}>
             <span className="input-group-text"> 
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">                        
                        <input
                            type="date"
                            className="form-control"
                            onChange={handleChange}
                            value={dateOfReservation}                    
                        />
                    </div>
                </div>
                    <div
                    className="btn input-group-append"
                    style={{ border: "none" }}
                >
                    <button className="input-group-text">Search</button>
                </div>
            </span>
        </form>
    );

    const adminLinks = () => {
        return (
            <div className="container-fluid mt-4 mr-2">
                <h4 style={{ borderBottom: "3px solid indigo" }}>Admin Links</h4>              
                        <Link className="nav-link" to="/create/location">
                           <ButtonContainer> Edit Location </ButtonContainer>
                        </Link>
                        <Link className="nav-link" to="/create/product">
                            <ButtonContainer>Edit Product</ButtonContainer>
                        </Link>
                        <Link className="nav-link" to="/create/available">
                            <ButtonContainer>Edit Available Hours</ButtonContainer>
                        </Link>
                        <Link className="nav-link" to={`/profile/${user.id}`}>
                            <ButtonContainer>Update Profile</ButtonContainer>
                        </Link>
            </div>
        );
    };

    const adminInfo = () => {
        return (
            <div className="container-fluid mb-5 mt-2">
                <h3 style={{ borderBottom: "3px solid indigo" }}>About you</h3>                
                    <p className="text-muted">You are: {user.lastName} {user.firstName}</p>
                    <p className="text-muted">Username: {user.username}</p>  
                    <p className="text-muted">Location: {local}</p> 
                    <p className="text-muted">Registered with: Admin</p>                  
            </div>
        );
    };    

    const filteredOrderByLocation = orders.filter(orderByName =>{
            return local === orderByName.orderLocation;             
        });

    const orderInfo = () => {
        return (
            <div className="mt-4">
                <h3 className="">Booking Information</h3>                
                <div className="card border-0 container-fluid d-flex justify-content-start TextStyle">
                    {filteredOrderByLocation.map((order, o) => (
                    <div key ={0} className="row text-muted" style={{ borderBottom: "2px solid indigo"}}>
                    <div className="col-9 mx-auto col-lg-3  my-2">{order.name}</div>
                    <div className="col-9 mx-auto col-lg-4  my-2">{order.orderProduct}</div>
                    <div className="col-9 mx-auto col-lg-3  my-2">{order.dateOfReservation} / {order.available}</div>                    
                    <div className="col-9 mx-auto col-lg-1  my-2 ">
                    <button onClick={() => destroy(order.orderId)} className="btn btn-outline-danger">
                    Delete
                    </button></div>
            </div>
                    ))}
                </div>
            </div>
        );
    };
   

    return (
        <Layout
            title="Dashboard"
            description={`G'day ${user.firstName} ${user.lastName}`}
            className="container-fluid"
        >
            <div className="main main-raised card TextStyle">
                <div className="row d-flex justify-content-start">
                    <div className="col-md-3 ">{adminLinks()}<br/>{adminInfo()}</div>
                    <div className="col-md-8 ">
                        {showLoading()}  
                        <h3 className="mt-4">Search orders by date</h3> 
                        {searchDateForm()}                      
                        {orderInfo()}   <br />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;