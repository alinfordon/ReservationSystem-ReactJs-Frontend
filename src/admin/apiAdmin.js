import { API } from "../config";

export const createLocation = (location) => { 
    return fetch(`${API}/Location`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(location)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const getLocations = (token) => {  
    return fetch(`${API}/Location`, {
        method: "GET",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteLocation = (locationId) => {
    return fetch(`${API}/Location/${locationId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getLocation = locationId => {
    return fetch(`${API}/Location/${locationId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateLocation = (location) => {
    console.log(location.locationId);
    return fetch(`${API}/Location/${location.locationId}`, {
        method: "PUT",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(location)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const createProduct = (product) => { 
    return fetch(`${API}/Product`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const getProducts = () => {
    return fetch(`${API}/Product`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const createAvailable = (available) => { 
    return fetch(`${API}/Available`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(available)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const getAvailables = () => {
    return fetch(`${API}/Available`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};