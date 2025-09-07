import axios from 'axios';

// Create a new Axios instance with a custom configuration
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Your backend's base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Use an interceptor to add the JWT token to every outgoing request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            // Add the token to the Authorization header
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

export default api;