import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signup } from "../auth";

const Signup = () => {
    const [values, setValues] = useState({
        firstname: "",
        lastname: "",        
        username: "",
        password: "",
        error: "",
        success: false
    });

    const { firstname, lastname, username, password, success, error } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ firstname, lastname, username, password }).then(data => {            
                setValues({
                    ...values,
                    firstname: "",
                    lastname: "",
                    username: "",
                    password: "",
                    error: "",
                    success: true
                });           
        });
    };

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">First Name</label>
                <input
                    onChange={handleChange("firstname")}
                    type="text"
                    className="form-control"
                    value={firstname}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Last Name</label>
                <input
                    onChange={handleChange("lastname")}
                    type="text"
                    className="form-control"
                    value={lastname}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">User Name</label>
                <input
                    onChange={handleChange("username")}
                    type="text"
                    className="form-control"
                    value={username}
                />
            </div>
            
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
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
            style={{ display: success ? "" : "none" }}
        >
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    );

    return (
        <Layout
            title="Signup"
            description="Signup to our salon"
            className="container col-md-8 offset-md-2"
        >
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>
    );
};

export default Signup;