import { API } from "../config";

export const createLocation = (location) => { 
    return fetch(`${API}/Locations`, {
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
    return fetch(`${API}/Locations`, {
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
    return fetch(`${API}/Locations/${locationId}`, {
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
    return fetch(`${API}/Locations/${locationId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateLocation = (location) => {
    console.log(location.locationId);
    return fetch(`${API}/Locations/${location.locationId}`, {
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

export const deleteProduct = (productId) => {
    return fetch(`${API}/Product/${productId}`, {
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

export const getProduct = productId => {
    return fetch(`${API}/Product/${productId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateProduct = (product) => {
    console.log(product.productId);
    return fetch(`${API}/Product/${product.productId}`, {
        method: "PUT",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
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

export const deleteAvailable = (availableId) => {
    return fetch(`${API}/Available/${availableId}`, {
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

export const getAvailable = availableId => {
    return fetch(`${API}/Available/${availableId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateAvailable = (available) => {
    console.log(available.availableId);
    return fetch(`${API}/Available/${available.availableId}`, {
        method: "PUT",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(available)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};