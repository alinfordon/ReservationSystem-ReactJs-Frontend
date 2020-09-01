import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { createAvailable, getAvailables, deleteAvailable, getAvailable, updateAvailable } from "./apiAdmin";

const AddAvailable = () => {
    const [availableName, setName] = useState("");
    const [availableId, setAvailableId] = useState("");
    const [availables, setAvailables] = useState([]);
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const  token  = isAuthenticated().token; 
    const  {firstName, lastName}  = isAuthenticated();
    

     const initAvailables = () => {
        getAvailables(token).then(data => {
            if (!data) {
              //  setError(data.error);
                setLoading(true);
            } else {
                setAvailables(data);
                setLoading(false);
            }
        });
    };

    useEffect(() => {       
        initAvailables();            
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

    const destroy = availableId => { 
        deleteAvailable(availableId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                initAvailables();
            }
        });
    };

    const initEdit = availableId => {
        getAvailable(availableId).then(data => {
            if (data.error) {
                setLoading(true);
            } else {                
                setName(data.availableName);  
                setAvailableId(data.availableId);   
                setEdit(true);           
            }
        });
    };
    
    const clickSubmit = e => {
        e.preventDefault();
        setError("");
        setSuccess(false);        
        createAvailable({ availableName }).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setError("");
                setSuccess(true);   
                setName("");             
                initAvailables();
            }
        });
    };

    const clickUpdate = e => {       
        e.preventDefault();
        setError("");
        setSuccess(false);        
        updateAvailable({ availableId, availableName }).then(data => {
                setEdit(false);
                setSuccess(true);   
                setName("");             
                initAvailables();           
        });
    };

    const newAvailableForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group h4 mt-2">
                <label className="text-muted">Set new available hours</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={availableName}
                    autoFocus
                    required
                />
            </div>
            <button className="btn btn-outline-primary">Create</button>
        </form>
    );

    const updateAvailableForm = () => (
        <form >
            <div className="form-group bg-danger h1">
                <label className="text-white">Edit mode</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={availableName}
                    autoFocus
                    required
                />
            </div>
            <button onClick={clickUpdate} className="btn btn-outline-danger mr-2">Save</button>
            <button onClick={() => (setEdit(false), setName(""))} className="btn btn-outline-danger">Cancel</button>
        </form>
    );

    const availableInfo = () => {
        return (
            <div className="mt-2">
                <h3 className="">Available Hours Information</h3>
                <div className="row">
                    {shouldRedirect(redirect)}
                    {availables.map((data, i) => (
                       <div key={i} className="card container-fluid text-muted">
                         <div className="row" style={{ borderBottom: "3px solid indigo"}}>
                            <div className="col-7 mx-auto col-lg-8  my-2">{data.availableName}</div>
                             <div className="col-7 mx-auto col-lg-2  my-2 d-flex justify-content-center">                                                       
                                <button onClick={() => initEdit(data.availableId)} className="btn btn-outline-warning mr-4">
                                  Edit
                                 </button>
                                 <button onClick={() => destroy(data.availableId)} className="btn btn-outline-danger ">
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
            return <h3 className="text-success">Available hours is ready</h3>;
        }
    };

    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Available hours should be unique</h3>;
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
            title="Add a new available hours"
            description={`G'day ${firstName} ${lastName}`}
        >
         <div onClick={() => (setSuccess(false))} className="main main-raised TextStyle">
            <div className="row d-flex justify-content-center">
                <div className="card col-md-3 mt-5 mr-4">
                    {showSuccess()}
                    {showError()}
                    {!edit ? newAvailableForm() : updateAvailableForm()}                    
                </div>
                <div className="col-md-8 mt-5 ">                    
                    {showLoading()}                    
                    {availableInfo()}                    
                </div>
            </div>
            <div className="d-flex justify-content-center">{goBack()}</div>
        </div>
        </Layout>
    );
};

export default AddAvailable;