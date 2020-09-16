import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { addLocalLocation, getLocalLocation, emptyLocalLocation } from "./locationHelper";
import { createLocation, getLocations, deleteLocation, getLocation, updateLocation } from "./apiAdmin";

const AddLocation = () => {
    const [locationName, setName] = useState("");
    const [locationId, setLocationId] = useState("");
    const [locations, setLocations] = useState([]);
    const [local, setLocal] = useState("");
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const  token  = isAuthenticated().token;
    const  user  = isAuthenticated();
    

     const initLocations = () => {
        getLocations(token).then(data => {
            if (!data) {
              //  setError(data.error);
                setLoading(true);
            } else {
                setLocations(data);
                setLoading(false);
            }
        });
    };

    useEffect(() => {       
        initLocations();     
        setLocal(getLocalLocation('location'));             
    }, []);

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/admin/dashboard" />;
        }
    };

    const handleChange = e => {
        setError("");
        setName(e.target.value); 
    };

        
    const destroy = locationId => { 
        deleteLocation(locationId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                initLocations();
            }
        });
    };

    const initEdit = locationId => {
        getLocation(locationId).then(data => {
            if (data.error) {
                setLoading(true);
            } else {                
                setName(data.locationName);  
                setLocationId(data.locationId);   
                setEdit(true);           
            }
        });
    };
    
    const clickSubmit = e => {
        e.preventDefault();
        setError("");
        setSuccess(false);        
        createLocation({ locationName }).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setError("");
                setSuccess(true);   
                setName("");             
                initLocations();
            }
        });
    };

    const clickUpdate = e => {       
        e.preventDefault();
        setError("");
        setSuccess(false);        
        updateLocation({ locationId, locationName }).then(data => {
                setEdit(false);
                setSuccess(true);   
                setName("");             
                initLocations();           
        });
    };

    const newLocationForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group h4 mt-2">
                <label className="text-muted">Set new location</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={locationName}
                    autoFocus
                    required
                />
            </div>
            <button className="btn btn-outline-primary">Create</button>
        </form>
    );

    const updateLocationForm = () => (
        <form >
            <div className="form-group bg-danger h1">
                <label className="text-white">Edit mode</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={locationName}
                    autoFocus
                    required
                />
            </div>
            <button onClick={clickUpdate} className="btn btn-outline-danger mr-2">Save</button>
            <button onClick={() => (setEdit(false), setName(""))} className="btn btn-outline-danger mr-4">Cancel</button>         
            
        </form>
    );

    const locationInfo = () => {
        return (
            <div className="mt-2">
                <h3 className="">Location Information</h3>
                <div className="row">
                    {shouldRedirect(redirect)}
                    {locations.map((data, i) => (
                       <div key={i} className="card container-fluid text-muted">
                         <div className="row" style={{ borderBottom: "3px solid indigo"}}>
                            <div className="col-7 mx-auto col-lg-8  my-2">{data.locationName}</div>
                             <div className="col-7 mx-auto col-lg-4  my-2 d-flex justify-content-center">                                                       
                                <button onClick={() => initEdit(data.locationId)} className="btn btn-outline-warning mr-2">
                                  Edit
                                 </button>                                        
                                 {local === data.locationName ?
                                <button className="btn btn-outline-success mr-2" 
                                                onClick={() => (emptyLocalLocation(data.locationName), setRedirect(true))} >
                                                It's Default
                                </button>:
                                <button className="btn btn-outline-warning mr-2" 
                                                onClick={() => (addLocalLocation(data.locationName), setRedirect(true))} >
                                                Add Default
                                </button>
            }                   <button onClick={() => destroy(data.locationId)} className="btn btn-outline-danger mr-2">
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

    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">Location is created</h3>;
        }
    };

    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Location should be unique</h3>;
        }
    };

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">
                Back to Dashboard
            </Link>
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
            title="Add a new location"
            description={`G'day ${user.firstName} ${user.lastName}`}
        >
         <div onClick={() => (setSuccess(false))} className="main main-raised TextStyle">
            <div className="row d-flex justify-content-center">
                <div className="card col-md-3 mt-5 mr-4">
                    {showSuccess()}
                    {showError()}
                    {!edit ? newLocationForm() : updateLocationForm()}                    
                </div>
                <div className="col-md-8 mt-5 ">                    
                    {showLoading()}                    
                    {locationInfo()}                    
                </div>
            </div>
            <div className="d-flex justify-content-center">{goBack()}</div>
        </div>
        </Layout>
    );
};

export default AddLocation;