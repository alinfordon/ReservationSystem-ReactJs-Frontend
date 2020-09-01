import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { getAvailables } from "./apiAdmin";
import { getOrders, getOrderByDate } from "../core/apiCore";
import Card from "../core/Card";
import { isAuthenticated } from "../auth";
import { getLocalLocation } from "./locationHelper";
import moment from "moment"; 

const AdminDashboard = () => { 
    const [availables, setAvailables] = useState([]);
    const [dateOfReservation, setDate] = useState("");
    const [orders, setOrders] = useState([]);    
     const [local, setLocal] = useState("");
    const [loading, setLoading] = useState(false);

    const  user = isAuthenticated();

    //console.log(user);

    const initAvailables = () => {
        getAvailables().then(data => {
            if (!data) {
              //  setError(data.error);
            } else {
                setAvailables(data);
            }
        });
    };

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

    useEffect(() => {              
        initAvailables();         
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
                
            } else {
                setOrders(data);
            }
        });
    };

    const searchDateForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group h4 mt-2 ">
                <label className="">Search date</label>
                <input
                    type="date"
                    className="form-control"
                    onChange={handleChange}
                    value={dateOfReservation}                    
                />
            </div>
            <button className="btn btn-outline-primary">Search</button>
        </form>
    );

    const adminLinks = () => {
        return (
            <div className="card mt-2 mr-2">
                <h4 className="card-header">Admin Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/location">
                            Edit Location
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/product">
                            Edit Product
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/available">
                            Edit Available Hours
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to={`/profile/${user.id}`}>
                            Update Profile
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const adminInfo = () => {
        return (
            <div className="card mb-5 mt-2">
                <h3 className="card-header">About you</h3>
                <ul className="list-group text-muted">
                    <li className="list-group-item">You are: {user.lastName} {user.firstName}</li>
                    <li className="list-group-item">Username: {user.username}</li>  
                    <li className="list-group-item">Location: {local}</li> 
                    <li className="list-group-item">Registered with: Admin</li>                    
                </ul>
            </div>
        );
    };

    const availableInfo = () => {
        return (
            <div className="">
                <h3 className="">Available Hours Information</h3>
                <div className="row">
                    {availables.map((data, a) => (
                       <div key={a} className="card container-fluid">
                         <div className="row" style={{  width: "10rem"}}>
                            <div className="col-8 mx-auto col-lg-6  my-2">{data.availableName}</div>
                             <div className="col-5 mx-auto col-lg-2  my-2">                                                       
                                <button className="btn btn-outline-warning ">
                                  Delete
                                 </button>
                            </div>
                         </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const filteredOrderByLocation = orders.filter(orderByName =>{
            return local === orderByName.orderLocation;             
        });



    const orderInfo = () => {
        return (
            <div className="mt-4">
                <h3 className="">Reservation Information</h3>                
                <div className="row mt-2">
                    {filteredOrderByLocation.map((data, o) => (
                      <Card key={o} order={data} />
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
            <div className="main main-raised TextStyle">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-3 ">{adminLinks()}<br/>{adminInfo()}</div>
                    <div className="col-md-8 ">
                        {showLoading()}  
                        {searchDateForm()}                      
                        {orderInfo()}   <br />  

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;