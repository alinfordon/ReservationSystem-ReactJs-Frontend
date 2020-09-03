import React from "react";
import { deleteOrder } from "./apiCore";

const Card = ({ order }) => {

    const destroy = orderId => { 
        deleteOrder(orderId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                
            }
        });
    };

    return (
        <div className="card container-fluid TextStyle">
            <div className="row text-muted" style={{ borderBottom: "2px solid indigo"}}>
                <div className="col-9 mx-auto col-lg-3  my-2">{order.name}</div>
                <div className="col-9 mx-auto col-lg-4  my-2">{order.orderProduct}</div>
                <div className="col-9 mx-auto col-lg-2  my-2">{order.dateOfReservation}</div>
                <div className="col-9 mx-auto col-lg-3  my-2">{order.available}
                <button onClick={() => destroy(order.orderId)} className="btn btn-outline-danger ">
                    Delete
                </button></div>
            </div>
        </div>
    );
};

export default Card;