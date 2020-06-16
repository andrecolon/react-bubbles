import axios from "axios";

const axiosWithAuth = () => {
    const token = localStorage.getItem("token");

    return axios.create({
        baseURL: "http://localhost:5000/api/",//Endpoint access - Line 157 - server.js
        headers: {
            Authorization: token
        }
    });
};

export default axiosWithAuth;
