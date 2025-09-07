const Complaint = require('../models/Complaint');
const Comment = require('../models/Comment');

// @desc    Create a new complaint
// @route   POST /api/complaints
exports.createComplaint = async (req, res) => {
    const { title, description, category } = req.body;
    try {
        const complaint = new Complaint({
            title,
            description,
            category,
            customer: req.user.id,
        });
        const createdComplaint = await complaint.save();
        res.status(201).json(createdComplaint);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get user's own complaints
// @route   GET /api/complaints
exports.getUserComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({ customer: req.user.id });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// --- THIS IS THE CORRECT, MERGED VERSION of getComplaintById ---
// @desc    Get a single complaint by ID with comments and authorization
// @route   GET /api/complaints/:id
exports.getComplaintById = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id)
            .populate('customer', 'firstName lastName')
            .populate({
                path: 'comments',
                populate: { path: 'user', select: 'firstName lastName role' }
            });

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        // Authorization Check
        const isOwner = complaint.customer._id.toString() === req.user.id.toString();
        const isAdminOrAgent = req.user.role === 'ADMIN' || req.user.role === 'AGENT';

        if (isOwner || isAdminOrAgent) {
            res.json(complaint);
        } else {
            return res.status(401).json({ message: 'Not authorized to view this complaint' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
};

// @desc    Add a comment to a complaint
// @route   POST /api/complaints/:id/comments
exports.addCommentToComplaint = async (req, res) => {
    const { text } = req.body;
    try {
        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }
        const comment = new Comment({
            text,
            user: req.user.id,
            complaint: req.params.id,
        });
        const createdComment = await comment.save();
        complaint.comments.push(createdComment._id);
        await complaint.save();
        res.status(201).json(createdComment);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
};

// @desc    Get all complaints (for Agents/Admins)
// @route   GET /api/complaints/all
exports.getAllComplaints = async (req, res) => {
    console.log('User Role:', req.user.role); // Debugging line
    try {
        const complaints = await Complaint.find({}).sort({ createdAt: -1 });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update a complaint's status (for Agents/Admins)
// @route   PUT /api/complaints/:id/status
exports.updateComplaintStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }
        complaint.status = status;
        complaint.agent = req.user.id;
        const updatedComplaint = await complaint.save();
        res.json(updatedComplaint);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};