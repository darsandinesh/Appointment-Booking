import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
}, { timestamps: true });

const AppointmentModel = mongoose.model('Appointment', appointmentSchema);

export default AppointmentModel