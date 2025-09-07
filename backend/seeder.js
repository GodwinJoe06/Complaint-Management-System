const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

// Load env vars
dotenv.config();

// Connect to the database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding...');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

connectDB();

// Data to be seeded (1 Admin, 3 Agents)
const users = [
    {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'ADMIN',
    },
    {
        firstName: 'Agent',
        lastName: 'One',
        email: 'agent1@example.com',
        password: 'password123',
        role: 'AGENT',
    },
    {
        firstName: 'Agent',
        lastName: 'Two',
        email: 'agent2@example.com',
        password: 'password123',
        role: 'AGENT',
    },
    {
        firstName: 'Agent',
        lastName: 'Three',
        email: 'agent3@example.com',
        password: 'password123',
        role: 'AGENT',
    },
];

// --- UPDATED IMPORT FUNCTION ---
const importData = async () => {
    try {
        // Clear existing users
        await User.deleteMany({});

        // Save each user individually to trigger the pre-save hook for password hashing
        for (const userData of users) {
            const user = new User(userData);
            await user.save();
        }

        console.log('✅ Data Imported! (Passwords are encrypted)');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Destroy data function remains the same
const destroyData = async () => {
    try {
        await User.deleteMany({});
        console.log('❌ Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Command-line logic remains the same
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}