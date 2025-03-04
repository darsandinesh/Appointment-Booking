import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const dbConnection = () => {

    mongoose.connect('mongodb://localhost:27017/appointment-system')
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('MongoDB connection error:', err));

}

export default dbConnection;