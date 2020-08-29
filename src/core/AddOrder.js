import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { getProducts, getLocations, getAvailables } from "../admin/apiAdmin";
import { createOrder, getOrders } from "./apiCore";
import moment from "moment";


const AddOrder = () => {
    
    const [values, setValues] = useState({
        name: "",
        locations: [],
        orderLocation: "",
        orderProduct: [],
        productName: "",       
        dateOfReservation: "",
        availables: [],
        available: "",
        loading: false,
        error: "",
        createdOrder: "",
        redirectToProfile: false
    });    
    const [locations, setLocations] = useState([]);
    const [products, setProducts] = useState([]);
    const [availables, setAvailables] = useState([]);
    const [orders, setOrders] = useState([]);
    const [success, setSuccess] = useState(false);
   
    const {
        name,        
        orderLocation,
        orderProduct,
        dateOfReservation,
        available,       
        loading,
        error,
        createdOrder,
        redirectToProfile
    } = values;

      
    const initLocations = () => {
        getLocations().then(data => {
            if (data.error) {
                setLocations({ error: data.error });
            } else {
                setLocations(data);
            }
        });        
    };

    const initProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                setProducts({ error: data.error });
            } else {
                setProducts(data);
            }
        });        
    };

    const initAvailables = () => {
        getAvailables().then(data => {
            if (data.error) {
                setAvailables({ error: data.error });
            } else {
                setAvailables(data);
            }
        });        
    };

    const initOrders = () => {
        getOrders().then(data => {
            if (data.error) {
                setOrders({ error: data.error });
            } else {
                setOrders(data);
            }
        });        
    };
  
    useEffect(() => { 
        initLocations();
        initProducts();
        initAvailables();  
        initOrders();      
    }, []);

     const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });
         
        createOrder({name, orderLocation, orderProduct, dateOfReservation, available} ).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
                setSuccess(false); 
            } else {
                setValues({
                    ...values,
                    name: "",
                    orderLocation: "",
                    orderProduct: "",
                    dateOfReservation: "", 
                    available: "",                   
                    loading: false,
                    createdOrder: data.name,
                    success: true
                });  
                setSuccess(true);
            }
        });
    };

    const filteredOrdersByDate = orders.filter(orderByDate =>{   
            let orderByDateFormat = moment(orderByDate.dateOfReservation).format('DD/MM/YYYY');
            let dateOfReservationFormat = moment(dateOfReservation).format('DD/MM/YYYY');
            return dateOfReservationFormat === orderByDateFormat;  
        });
    var array1 = filteredOrdersByDate.map(data => {
        return data.available;
    })
    var array2 = availables.map(data => {
        return data.availableName;
    })
   
    var tempArr = array2.filter(function(item) {
      return !array1.includes(item); 
    });
    array1 = array1.filter(function(item) {
      return !array2.includes(item); 
    });
    array2 = tempArr;

   
//console.log("Array from Order by date", filteredOrdersByDate); 
//console.log("Array from Available by date without reserved hours ", filteredAvailableHour); 

    const newPostForm = () => (
        <form className="mb-3 mt-4" onSubmit={clickSubmit}>
            <h4>BOOK AN APPOINTMENT</h4><br/>           

            <div className="form-group">
                <label className="">Your Name</label>
                <input
                    onChange={handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>
            <div className="form-group">
                <label className="">Choose Location</label>
                <select
                    onChange={handleChange("orderLocation")}
                    className="form-control TextStyle"
                >
                    <option>Select</option>
                    {locations &&
                        locations.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.locationName}
                            </option>
                        ))}
                </select>
            </div>
            <div className="form-group">
                <label className="">Choose Our Services</label>
                <select
                    onChange={handleChange("orderProduct")}
                    className="form-control TextStyle"
                >
                    <option>Select</option>
                    {products &&
                        products.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.productName}
                            </option>
                        ))}
                </select>
            </div>
           <div className="form-group">
                <label className="">Choose date of reservation</label>
                <input
                    onChange={handleChange("dateOfReservation")}
                    type="date"
                    className="form-control TextStyle"
                    value={dateOfReservation}
                />
            </div>
            <div className="form-group">
                <label className="">Choose Hours</label>
                <select
                    onChange={handleChange("available")}
                    className="form-control TextStyle"
                >
                    <option>Select</option>
                    {array2 &&
                        array2.map((c, i) => (
                            <option key={i} value={c.availableName}>
                                {c}
                            </option>
                        ))}
                </select>
            </div>
            <button className="btn btn-outline-warning">Boock Now</button>
        </form>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showSuccess = () => (
        <div
            className="alert alert-info"
            style={{ display: createdOrder ? "" : "none" }}
        >
            <h2>{`${createdOrder}`} is created!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    return (
        <Layout
            title="BOOK AN APPOINTMENT"
            description={`G'day User`}
        >
        <div className="main main-raised">
            <div className="row TextStyle">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>
        </div>
        </Layout>
    );
};

export default AddOrder;