import AppointmentModel from "../models/appointmentModel.js";

// Get available slots for a specific date
export const getSlots = async (req, res) => {
    try {
        const date = req.params.date;

        const allSlots = [];
        for (let hour = 10; hour < 17; hour++) {
            if (hour === 13) continue;

            allSlots.push(`${hour}:00`);
            allSlots.push(`${hour}:30`);
        }

        const bookedAppointments = await AppointmentModel.find({ date }).select('time -_id');
        const bookedTimes = bookedAppointments.map(booked => booked.time);

        const availableSlots = allSlots.filter(slot => {
            const [hour, minute] = slot.split(':');
            const hourNum = parseInt(hour);
            const ampm = hourNum >= 12 ? 'PM' : 'AM';
            const hour12 = hourNum > 12 ? hourNum - 12 : (hourNum === 0 ? 12 : hourNum);
            const formattedSlot = `${hour12}:${minute} ${ampm}`;
            return !bookedTimes.includes(formattedSlot);
        });

        res.status(200).json({ available_slots: availableSlots });

    } catch (error) {
        console.log(error, 'Error in getSlots');
        res.status(500).json({ error: error.message });
    }
}

// Book a new appointment
export const bookAppointment = async (req, res) => {
    const { name, phone, date, slot } = req.body;
    try {

        console.log(req.body)
        if (!name || !phone || !date || !slot) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        console.log('1')
        const existingAppointment = await AppointmentModel.findOne({ date: slot });
        if (existingAppointment) {
            return res.status(400).json({ error: 'This time slot is already booked' });
        }
        console.log('2')
        const time = slot;
        const newAppointment = new AppointmentModel({ name, phone, date, time });
        await newAppointment.save();
        console.log('3')
        res.status(201).json({ success: true, message: 'Appointment booked successfully' });

    } catch (error) {
        console.log(error, 'Error in bookAppointment');
        res.status(500).json({ error: error.message });
    }
}