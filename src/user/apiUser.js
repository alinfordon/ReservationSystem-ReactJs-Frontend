import { API } from "../config";
import { authHeader } from "../auth";

export const read = Id => {
    return fetch(`${API}/users/${Id}`, {
        method: "GET",
        headers: authHeader()
    })
        .then(handleResponse);
};

export const update = (Id, user) => {
    return fetch(`${API}/users/${Id}`, {
        method: "PUT",
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    })
       .then(handleResponse);
};

export const updateUser = (user, next) => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("jwt")) {
            let auth = JSON.parse(localStorage.getItem("jwt"));
            auth.user = user;
            localStorage.setItem("jwt", JSON.stringify(auth));
            next();
        }
    }
};


function logout() {   
    localStorage.removeItem('jwt');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
               logout();             
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}