import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { createProduct, getProducts, deleteProduct, getProduct, updateProduct } from "./apiAdmin";

const AddProduct = () => {
    const [productName, setName] = useState("");
    const [productId, setProductId] = useState("");
    const [products, setProducts] = useState([]);
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const  token  = isAuthenticated().token;
    const  {firstName, lastName}  = isAuthenticated();

     const initProducts = () => {
        getProducts(token).then(data => {
            if (!data) {
              //  setError(data.error);
                setLoading(true);
            } else {
                setProducts(data);
                setLoading(false);
            }
        });
    };

    useEffect(() => {       
        initProducts();            
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

    const destroy = productId => { 
        deleteProduct(productId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                initProducts();
            }
        });
    };

    const initEdit = productId => {
        getProduct(productId).then(data => {
            if (data.error) {
                setLoading(true);
            } else {                
                setName(data.productName);  
                setProductId(data.productId);   
                setEdit(true);           
            }
        });
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
                setName("");             
                initProducts();
            }
        });
    };

    const clickUpdate = e => {       
        e.preventDefault();
        setError("");
        setSuccess(false);        
        updateProduct({ productId, productName }).then(data => {
                setEdit(false);
                setSuccess(true);   
                setName("");             
                initProducts();           
        });
    };

    const newProductForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group h4 mt-2">
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
            <button className="btn btn-outline-primary">Create</button>
        </form>
    );

    const updateProductForm = () => (
        <form >
            <div className="form-group bg-danger h1">
                <label className="text-white">Edit mode</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={productName}
                    autoFocus
                    required
                />
            </div>
            <button onClick={clickUpdate} className="btn btn-outline-danger mr-2">Save</button>
            <button onClick={() => (setEdit(false), setName(""))} className="btn btn-outline-danger">Cancel</button>
        </form>
    );

    const locationInfo = () => {
        return (
            <div className="mt-2">
                <h3 className="">Product Information</h3>
                <div className="row">
                    {shouldRedirect(redirect)}
                    {products.map((data, i) => (
                       <div key={i} className="card container-fluid text-muted">
                         <div className="row" style={{ borderBottom: "3px solid indigo"}}>
                            <div className="col-7 mx-auto col-lg-8  my-2">{data.productName}</div>
                             <div className="col-7 mx-auto col-lg-2  my-2 d-flex justify-content-center">                                                       
                                <button onClick={() => initEdit(data.productId)} className="btn btn-outline-warning mr-4">
                                  Edit
                                 </button>
                                 <button onClick={() => destroy(data.productId)} className="btn btn-outline-danger ">
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
            return <h3 className="text-success">Product is ready</h3>;
        }
    };

    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Product should be unique</h3>;
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
            title="Add a new product"
            description={`G'day ${firstName} ${lastName}`}
        >
         <div onClick={() => (setSuccess(false))} className="main main-raised TextStyle">
            <div className="row d-flex justify-content-center">
                <div className="card col-md-3 mt-5 mr-4">
                    {showSuccess()}
                    {showError()}
                    {!edit ? newProductForm() : updateProductForm()}                    
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

export default AddProduct;