import api from './api';

/**
 * Sends a login request to the backend.
 * @param {object} credentials - The user's credentials { email, password }.
 * @returns {Promise<object>} The server's response.
 */
const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        // STORE THE ROLE
        localStorage.setItem('role', response.data.role); 
    }
    return response.data;
};

const getUserRole = () => {
    return localStorage.getItem('role');
};

/**
 * Sends a registration request to the backend.
 * @param {object} userData - The new user's data { firstName, lastName, email, password }.
 * @returns {Promise<object>} The server's response.
 */
const register = (userData) => {
    return api.post('/auth/register', userData);
};

/**
 * Logs the user out by removing the token from local storage.
 */
const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); // Remove role on logout
};

/**
 * Checks if a user token exists in local storage.
 * @returns {boolean} True if the user is logged in, false otherwise.
 */
const isLoggedIn = () => {
    return !!localStorage.getItem('token');
};


const authService = {
    login,
    register,
    logout,
    isLoggedIn,
    getUserRole,
};

export default authService;