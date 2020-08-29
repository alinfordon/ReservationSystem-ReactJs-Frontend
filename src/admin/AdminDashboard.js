import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { getProducts,  getAvailables } from "./apiAdmin";
import { getOrders } from "../core/apiCore";
import Card from "../core/Card";

const AdminDashboard = () => {   
    const [products, setProducts] = useState([]);    
    const [availables, setAvailables] = useState([]);
    const [orders, setOrders] = useState([]);    
    const [loading, setLoading] = useState(false);


     const initProducts = () => {
        getProducts().then(data => {
            if (!data) {
               // setError(data.error); 
                setLoading(true);
            } else {
                setLoading(false);
                setProducts(data);
            }
        });
    };

    

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
        initProducts();        
        initAvailables();  
        initOrders();      
    }, []);

     const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
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
                        <Link className="nav-link" to="/admin/profile">
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
                <h3 className="card-header">Admin Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">Admin Name</li>
                    <li className="list-group-item">Admin Email</li>  
                    <li className="list-group-item">Admin</li>                    
                </ul>
            </div>
        );
    };

    const productInfo = () => {
        return (
            <div className="mt-2">
                <h3 className="">Product Information</h3>
                <div className="row">
                    {products.map((data, i) => (
                       <div className="card container-fluid">
                         <div className="row" style={{ borderBottom: "3px solid indigo"}}>
                            <div className="col-7 mx-auto col-lg-5  my-2">{data.productName}</div>
                             <div className="col-7 mx-auto col-lg-2  my-2 d-flex justify-content-center">                                                       
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


    const availableInfo = () => {
        return (
            <div className="">
                <h3 className="">Available Hours Information</h3>
                <div className="row">
                    {availables.map((data, i) => (
                       <div className="card container-fluid">
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
            description={`G'day Admin!`}
            className="container-fluid"
        >
            <div className="main main-raised TextStyle">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-3 ">{adminLinks()}<br/>{adminInfo()}</div>
                    <div className="col-md-8 ">
                        {showLoading()}
                        {orderInfo()}   <br />
                        {productInfo()}   <br />
                                                 
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;