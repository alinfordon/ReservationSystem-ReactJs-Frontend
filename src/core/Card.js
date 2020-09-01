import React from "react";
import { Link } from "react-router-dom";


const Card = ({ order }) => {
    return (
        <div className="card container-fluid TextStyle">
            <div className="row text-muted" style={{ borderBottom: "2px solid indigo"}}>
                <div className="col-9 mx-auto col-lg-3  my-2">Order nr. {order.orderId}: {order.name}</div>
                <div className="col-9 mx-auto col-lg-5  my-2">{order.orderProduct}</div>
                <div className="col-9 mx-auto col-lg-2  my-2">{order.dateOfReservation}</div>
                <div className="col-9 mx-auto col-lg-2  my-2">{order.available}</div>
            </div>
        </div>
    );
};

export default Card;