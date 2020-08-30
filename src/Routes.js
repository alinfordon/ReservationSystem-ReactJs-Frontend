import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import UserDashboard from "./user/UserDashboard";
import AdminDashboard from "./admin/AdminDashboard";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import AddLocation from "./admin/AddLocation";
import AddProduct from "./admin/AddProduct";
import AddAvailable from "./admin/AddAvailable";
import AddOrder from "./core/AddOrder";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />   
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <AdminRoute
                    path="/admin/dashboard"
                    exact
                    component={AdminDashboard}
                />    
                <PrivateRoute
                    path="/user/dashboard"
                    exact
                    component={UserDashboard}
                />     
                 <AdminRoute
                    path="/create/location"
                    exact
                    component={AddLocation}
                />  
                <AdminRoute
                    path="/create/product"
                    exact
                    component={AddProduct}
                />   
                <AdminRoute
                    path="/create/available"
                    exact
                    component={AddAvailable}
                />  
                <PrivateRoute
                    path="/create/order"
                    exact
                    component={AddOrder}
                />               
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
