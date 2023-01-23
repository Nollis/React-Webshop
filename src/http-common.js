import axios from "axios";

export default axios.create({
    baseURL: "https://localhost:7127",
    headers: {
        "Content-type": "application/json"
    },
    withCredentials: false,
});