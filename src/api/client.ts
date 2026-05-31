import axios from 'axios'

const API_BASE_URL = '';


export const apiAxiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer super-secret-doodle-token",
    },
});