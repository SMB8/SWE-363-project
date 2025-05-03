import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import process from 'node:process';
import authRoutes from './routes/auth.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));


app.use('/api/auth', authRoutes);
//todo, middleware so all routes are protected and no access to the api without a token


// Start the server
const PORT = 54321;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});