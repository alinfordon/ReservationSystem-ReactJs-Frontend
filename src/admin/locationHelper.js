export const addLocalLocation = (locationName) => {        
    if (typeof window !== "undefined") {
        localStorage.setItem("location", JSON.stringify(locationName));     
    }
};

export const getLocalLocation = () => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("location")) {
            return JSON.parse(localStorage.getItem("location"));
        }
    }
    return "";
};

export const emptyLocalLocation = next => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("location");       
    }
};