import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import todoRoutes from './routes/todoRoutes.js'
import mongoose from 'mongoose';

dotenv.config();

const app = express();

// Middlewares
app.use(bodyParser.json());

// Error handling middleware for body-parser errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: 'Invalid JSON format' });
    }
    next(); // Pass to next middleware if not an error
});

// MongoDB connection
const uri = process.env.MONGO_URI;

// Connection
mongoose.connect(uri)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error('Failed to connect to MongoDB', err))

// Use Routes
app.use('/api', todoRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})
