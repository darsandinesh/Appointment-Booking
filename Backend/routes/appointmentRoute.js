import express from 'express';
import { bookAppointment, getSlots } from '../controller/appointmentController.js';

const Router = express.Router();

Router.get('/available-slots/:date', getSlots);
Router.post('/book-appointment',bookAppointment)

export default Router;