import React from "react";
import Menu from "./Menu";
import "../styles.css";

const Layout = ({
    title = "Title",
    description = "Description", 
    className,
    children
}) => (
    <div>
        <Menu />
        <div className="page-header">
            <div className="HeaderStyle">
                <h2>{title}</h2>
                <p className="lead text-muted">{description}</p>
            </div>
        </div>
        <div className={className}>{children}</div>
        <blockquote  className="section text-center">
            <h6 className="blockquote-footer font-italic">© {(new Date().getFullYear())} Reservation System, All Rights Reserved</h6>       
        </blockquote> 
    </div>
);

export default Layout;
