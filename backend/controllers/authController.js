import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(409).json({
                message: 'ID already exists. Please login with the same password.'
            });
        }

        const user = await User.create({
            name,
            email,
            password
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        let user = await User.findOne({ email });

        if (!user) {
            // Auto-register if not found (Instant Onboarding)
            user = await User.create({
                name: email.split('@')[0],
                email,
                password,
                role: 'client'
            });
        } else {
            // Check password if user exists
            if (!(await user.matchPassword(password))) {
                return res.status(401).json({ message: 'Wrong password for this ID.' });
            }
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { registerUser, loginUser, getUserProfile };
