const express = require('express');
const router = express.Router();
const {
    createComplaint,
    getUserComplaints,
    getComplaintById,         // Import new function
    addCommentToComplaint, 
    getAllComplaints,
    updateComplaintStatus   // Import new function
} = require('../controllers/complaintController');
const { protect , authorize } = require('../middleware/authMiddleware');

// Route for getting all complaints and creating a new one
router.route('/')
    .get(protect, getUserComplaints)
    .post(protect, createComplaint);

// Route for getting a single complaint by its ID
router.route('/:id')
    .get(protect, getComplaintById);

// Route for adding a comment to a specific complaint
router.route('/:id/comments')
    .post(protect, addCommentToComplaint);

// 2. Update this route to include the authorize middleware
router.route('/all')
    .get(protect, authorize('ADMIN', 'AGENT'), getAllComplaints);

router.route('/:id/status')
    .put(protect, authorize('ADMIN', 'AGENT'), updateComplaintStatus);

module.exports = router;