// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. UPDATE THIS FUNCTION to include the user's role
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
    // ... (This function remains the same, but you could add role logic if needed)
    const { firstName, lastName, email, password, role } = req.body; // Allow role on register
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = await User.create({ firstName, lastName, email, password, role });
        res.status(201).json({ 
            token: generateToken(user._id, user.role), // Pass role here too
            role: user.role 
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


// @desc    Authenticate user & get token
// @route   POST /api/auth/login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            // 2. PASS THE ROLE when generating the token and in the response
            res.json({
                token: generateToken(user._id, user.role),
                role: user.role
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};