import axios from "axios";
import config from "./config";

axios.defaults.baseURL = config.apiURL;

export const getHealthCheck = () => {
    const requestURL = "admin/healthcheck";
    return axios.get(requestURL);
};