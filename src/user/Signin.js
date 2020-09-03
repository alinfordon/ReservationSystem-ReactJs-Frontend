import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";

const Signin = () => {
    const [values, setValues] = useState({
        Username: "",
        Password: "",
        error: "",
        loading: false,
        redirectToReferrer: false
    });

    const { Username, Password, loading, error, redirectToReferrer } = values;  

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ Username, Password }).then(data => {
            if (data.error) {
                console.log(data)
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };

    const signUpForm = () => (
        <form className="col-md-8 py-4">
            <div className="form-group">
                <label className="text-muted">User Name</label>
                <input
                    onChange={handleChange("Username")}
                    type="text"
                    className="form-control"
                    value={Username}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={handleChange("Password")}
                    type="password"
                    className="form-control"
                    value={Password}
                />
            </div>
             <button onClick={clickSubmit} className="btn btn-primary">
                <i className="fas fa-sign-in-alt"></i> Signin
            </button> or <span></span>
            <Link to="/signup" >
                <button className="btn btn-primary">
                    <i className="fas fa-user-plus"></i> Register
                </button>
            </Link>
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

    const showLoading = () =>
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToReferrer) {            
            if (isAuthenticated() && isAuthenticated().role === "Admin") {
                return <Redirect to="/admin/dashboard" />;
            } else if (isAuthenticated() && isAuthenticated().role === "User") {
                return <Redirect to="/user/dashboard" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    return (
        <Layout
            title="Signin"
            description="Signin to our salon"
            
        >
        <div className="container-fluid ">
            <div className="main main-raised TextStyle">
                <div className="row d-flex justify-content-center">
                {showLoading()}
                {showError()}                
                {signUpForm()}
                {redirectUser()}
                </div>
            </div>
        </div>
        </Layout>
    );
};

export default Signin;