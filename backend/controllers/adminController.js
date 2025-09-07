const User = require('../models/User');
const Complaint = require('../models/Complaint');

// @desc    Get system statistics
// @route   GET /api/admin/stats
exports.getStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalComplaints = await Complaint.countDocuments();
        const newComplaints = await Complaint.countDocuments({ status: 'NEW' });
        const resolvedComplaints = await Complaint.countDocuments({ status: 'RESOLVED' });

        res.json({
            totalUsers,
            totalComplaints,
            newComplaints,
            resolvedComplaints,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all users
// @route   GET /api/admin/users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};