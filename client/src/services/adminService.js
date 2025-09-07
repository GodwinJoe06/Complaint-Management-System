import api from './api';

/**
 * Fetches system statistics for the admin dashboard.
 * @returns {Promise<object>} A promise that resolves to the stats data.
 */
const getStats = () => {
    return api.get('/admin/stats');
};

/**
 * Fetches a list of all users in the system.
 * @returns {Promise<object>} A promise that resolves to the list of users.
 */
const getUsers = () => {
    return api.get('/admin/users');
};

const adminService = {
    getStats,
    getUsers,
};

export default adminService;