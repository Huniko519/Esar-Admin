
import axios from 'axios';
import history from "../history";
const apiUrl = 'http://localhost:8000/api/auth'; //your api base url
const proxyurl = "https://thingproxy.freeboard.io/fetch/"; //proxy for local testing, remove this in production version
function getHeader() {
    const token = localStorage.getItem("token");
    const expiration = localStorage.getItem("token_exp");
    if (expiration * 1000 < Date.now()) {
        history.push("/");
        return {
            "Content-Type": "application/json",
        };
    }
    if (token) {
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            useCredentials: true,
        };
    } else {
        return {
            "Content-Type": "application/json",
        };
    }
}
const api = axios.create({
    baseURL: apiUrl,
    headers: getHeader(),
})



export default api;
  