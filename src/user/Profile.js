import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import { read, update, updateUser } from "./apiUser";

const Profile = ({ match }) => {
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        error: false,
        success: false
    });

    const { id } = isAuthenticated();
    const { firstName, lastName, username, password, error, success } = values;

    const init = Id => {        
        read(id).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, username: data.username, firstName: data.firstName, lastName: data.lastName });
            }
        });
    };

    useEffect(() => {
        init(match.params.id);
    }, []);

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        update(id, { firstName, lastName, username, password }).then(
            data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    updateUser(data, () => {
                        setValues({
                            ...values,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            username: data.username,
                            success: true
                        });
                    });
                }
            }
        );
    };

    const redirectUser = success => {
        if (success) {
            return <Redirect to="/" />;
        }
    };

    const profileUpdate = (firstName, lastName, username, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">First Name</label>
                <input
                    type="text"
                    onChange={handleChange("firstName")}
                    className="form-control"
                    value={firstName}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Last Name</label>
                <input
                    type="text"
                    onChange={handleChange("lastName")}
                    className="form-control"
                    value={lastName}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">User Name</label>
                <input
                    type="text"
                    onChange={handleChange("username")}
                    className="form-control"
                    value={username}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    type="password"
                    onChange={handleChange("password")}
                    className="form-control"
                    value={password}
                />
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
            <div>
                <br/>
            </div>
        </form>
    );

    return (
        <Layout
            title="Profile"
            description="Update your profile"           
        >
        <div className="main main-raised">
            <div className="row TextStyle">
                <div className="col-md-8 offset-md-2">
                    <h2 className="mb-4 mt-4">Profile update</h2>
                    {profileUpdate(firstName, lastName, username, password)}
                    {redirectUser(success)}
                </div>
            </div>
        </div>
        </Layout>
    );
};

export default Profile;
