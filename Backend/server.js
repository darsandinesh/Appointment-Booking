import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnection from './config/dbConnection.js';
import Router from './routes/appointmentRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

dbConnection();

app.use('/', Router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));