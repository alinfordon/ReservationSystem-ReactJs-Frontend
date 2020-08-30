import { API } from "../config";
import { authHeader } from "../auth";



export const createLocation = (location) => { 
    return fetch(`${API}/Locations`, {
        method: "POST",
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(location)
    })
        .then(handleResponse);
};

export const getLocations = (token) => {    
    return fetch(`${API}/Locations`, {
        method: "GET",
        headers: authHeader()
    })
        .then(handleResponse);
};

export const deleteLocation = (locationId) => {
    return fetch(`${API}/Locations/${locationId}`, {
        method: "DELETE",
        headers: authHeader()
        })    
        .then(handleResponse);
};

export const getLocation = locationId => {
    return fetch(`${API}/Locations/${locationId}`, {
        method: "GET",
        headers: authHeader()
    })
        .then(handleResponse);
};

export const updateLocation = (location) => {   
    return fetch(`${API}/Locations/${location.locationId}`, {
        method: "PUT",
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(location)
    })
        .then(handleResponse);
};

export const createProduct = (product) => { 
    return fetch(`${API}/Product`, {
        method: "POST",
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(product)
    })
        .then(handleResponse);
};

export const getProducts = () => {
    return fetch(`${API}/Product`, {
        method: "GET",
        headers: authHeader()
    })
    .then(handleResponse);        
};

export const deleteProduct = (productId) => {
    return fetch(`${API}/Product/${productId}`, {
        method: "DELETE",
        headers: authHeader()
        })    
        .then(handleResponse);
};

export const getProduct = productId => {
    return fetch(`${API}/Product/${productId}`, {
        method: "GET",
        headers: authHeader()
    })
        .then(handleResponse);
};

export const updateProduct = (product) => {
    console.log(product.productId);
    return fetch(`${API}/Product/${product.productId}`, {
        method: "PUT",
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(product)
    })
        .then(handleResponse);
};

export const createAvailable = (available) => { 
    return fetch(`${API}/Available`, {
        method: "POST",
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(available)
    })
        .then(handleResponse);
};

export const getAvailables = () => {
    return fetch(`${API}/Available`, {
        method: "GET",
        headers: authHeader()
    })
        .then(handleResponse);
};

export const deleteAvailable = (availableId) => {
    return fetch(`${API}/Available/${availableId}`, {
        method: "DELETE",
        headers: authHeader()
    })
        .then(handleResponse);
};

export const getAvailable = availableId => {
    return fetch(`${API}/Available/${availableId}`, {
        method: "GET",
        headers: authHeader()
    })
        .then(handleResponse);
};

export const updateAvailable = (available) => {
    console.log(available.availableId);
    return fetch(`${API}/Available/${available.availableId}`, {
        method: "PUT",
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(available)
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