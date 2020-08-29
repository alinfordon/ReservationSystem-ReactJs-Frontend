import React, { useState } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { createProduct } from "./apiAdmin";

const AddProduct = () => {
    const [productName, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


    const handleChange = e => {
        setError("");
        setName(e.target.value); 
    };

    const clickSubmit = e => {
        e.preventDefault();
        setError("");
        setSuccess(false);        
        createProduct({ productName }).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setError("");
                setSuccess(true);
            }
        });
    };

    const newLocationForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Create new product</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={productName}
                    autoFocus
                    required
                />
            </div>
            <button className="btn btn-outline-primary">Create new product</button>
        </form>
    );

    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">{productName} is created</h3>;
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

    return (
        <Layout
            title="Add a new products"
            description={`G'day Admin`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newLocationForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    );
};

export default AddProduct;