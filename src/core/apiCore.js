import { API } from "../config";
import { authHeader } from "../auth";

export const createOrder = (order) => { 
    return fetch(`${API}/Orders`, {
        method: "POST",
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(order)
    })
        .then(handleResponse);
};

export const getOrders = () => {
    return fetch(`${API}/Orders`, {
        method: "GET",
        headers: authHeader()
    })
        .then(handleResponse);
};

export const deleteOrder = (orderId) => {
    return fetch(`${API}/Orders/${orderId}`, {
        method: "DELETE",
        headers: authHeader()
        })    
        .then(handleResponse);
};

export const getOrderByDate = dateOfReservation => {    
    return fetch(`${API}/Orders/dateorder/${dateOfReservation}`, {
        method: "GET",
        headers: authHeader()
    })
        .then(handleResponse);
};

export const getOrderByName = name => {    
    return fetch(`${API}/Orders/userorder/${name}`, {
        method: "GET",
        headers: authHeader()
    })
        .then(handleResponse);
};

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                            
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}