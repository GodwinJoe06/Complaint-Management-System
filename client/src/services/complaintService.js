import api from './api';

/**
 * Fetches all complaints for the currently authenticated user.
 * @returns {Promise<object>} A promise that resolves to the list of complaints.
 */
export const getUserComplaints = () => {
    return api.get('/complaints');
};

/**
 * Fetches a single complaint by its unique ID.
 * @param {number} id - The ID of the complaint.
 * @returns {Promise<object>} A promise that resolves to the complaint data.
 */
const getComplaintById = (id) => {
    return api.get(`/complaints/${id}`);
};

/**
 * Submits a new complaint to the backend.
 * @param {object} complaintData - The complaint data { title, description, category }.
 * @returns {Promise<object>} A promise that resolves to the newly created complaint.
 */
const createComplaint = (complaintData) => {
    return api.post('/complaints', complaintData);
};

/**
 * Updates the status of an existing complaint (for Agents/Admins).
 * @param {number} id - The ID of the complaint to update.
 * @param {string} status - The new status (e.g., 'IN_PROGRESS', 'RESOLVED').
 * @returns {Promise<object>} A promise that resolves to the updated complaint.
 */
const updateComplaintStatus = (id, status) => {
    // The backend might expect the status in a specific format, e.g., { "status": "RESOLVED" }
    return api.put(`/complaints/${id}/status`, { status });
};

/**
 * Posts a new comment to a specific complaint.
 * @param {number} complaintId - The ID of the complaint.
 * @param {string} text - The content of the comment.
 * @returns {Promise<object>} A promise that resolves to the newly created comment.
 */
const postComment = (complaintId, text) => {
    return api.post(`/complaints/${complaintId}/comments`, text );
};

const getAllComplaints = () => {
    return api.get('/complaints/all');
};

const complaintService = {
    getUserComplaints,
    getComplaintById,
    createComplaint,
    updateComplaintStatus,
    postComment,
    getAllComplaints
};

export default complaintService;