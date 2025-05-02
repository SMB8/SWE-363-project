import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Sign up route
router.post('/signup', async (req, res) => {
    const { fullName, email, studentId, password, accountType } = req.body;

    // Check if the email or student ID already exists
    const userExists = await User.findOne({ $or: [{ email }, { studentId }] });
    if (userExists) {
        return res.status(400).json({ message: 'Email or Student ID already exists' });
    }

    // Create a new user
    const user = new User({ fullName, email, studentId, password, accountType });

    try {
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error creating user' });
    }
});

// Sign in route
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if the password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
        { userId: user._id, accountType: user.accountType },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
});

export default router;
