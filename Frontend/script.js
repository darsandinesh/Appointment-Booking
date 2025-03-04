document.addEventListener('DOMContentLoaded', () => {
    const slotsContainer = document.getElementById('slots-container');
    const bookBtn = document.getElementById('book-btn');
    const dateInput = document.getElementById('date');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const messageDiv = document.getElementById('message');

    let bookedSlots = {};

    async function fetchAvailableSlots(date) {
        try {
            const response = await fetch(`http://localhost:8001/available-slots/${date}`);
            const data = await response.json();
            return data.available_slots;
        } catch (error) {
            console.error('Error fetching available slots:', error);
            return [];
        }
    }

    async function bookAppointment(name, phone, date, slot) {
        try {
            const response = await fetch('http://localhost:8001/book-appointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, phone, date, slot })
            });
            const data = await response.json();
            return data.success;
        } catch (error) {
            console.error('Error booking appointment:', error);
            return false;
        }
    }

    function isFutureSlot(date, slot) {
        const [hour, minute] = slot.split(':');
        const hourNum = parseInt(hour);
        const ampm = slot.includes('PM') ? 'PM' : 'AM';
        const hour24 = ampm === 'PM' && hourNum !== 12 ? hourNum + 12 : hourNum;
        const slotDate = new Date(date);
        slotDate.setHours(hour24, parseInt(minute), 0, 0);

        return slotDate > new Date();
    }

    dateInput.addEventListener('change', async () => {
        const selectedDate = dateInput.value;
        slotsContainer.innerHTML = '';

        if (!selectedDate) {
            slotsContainer.innerHTML = '<p class="info-text">Please select a date to view available slots</p>';
            return;
        }

        const availableSlots = await fetchAvailableSlots(selectedDate);
        availableSlots.forEach(slot => {
            const slotBtn = document.createElement('button');
            slotBtn.textContent = slot;
            slotBtn.className = 'slot-btn';
            slotBtn.disabled = bookedSlots[selectedDate]?.includes(slot) || !isFutureSlot(selectedDate, slot);
            slotBtn.addEventListener('click', () => {
                document.querySelectorAll('.slot-btn').forEach(btn => btn.classList.remove('selected'));
                slotBtn.classList.add('selected');
                bookBtn.disabled = false;
            });
            slotsContainer.appendChild(slotBtn);
        });
    });

    bookBtn.addEventListener('click', async () => {
        const selectedDate = dateInput.value;
        const selectedSlot = document.querySelector('.slot-btn.selected').textContent;
        const name = nameInput.value;
        const phone = phoneInput.value;

        if (!selectedDate || !selectedSlot || !name || !phone) {
            messageDiv.textContent = 'Please fill in all fields.';
            messageDiv.classList.remove('hidden');
            return;
        }

        const success = await bookAppointment(name, phone, selectedDate, selectedSlot);
        if (success) {
            if (!bookedSlots[selectedDate]) {
                bookedSlots[selectedDate] = [];
            }

            bookedSlots[selectedDate].push(selectedSlot);
            messageDiv.textContent = `Appointment booked for ${selectedDate} at ${selectedSlot}.`;
            messageDiv.classList.remove('hidden');
            bookBtn.disabled = true;
            document.querySelector('.slot-btn.selected').disabled = true;
        } else {
            messageDiv.textContent = 'Failed to book appointment. Please try again.';
            messageDiv.classList.remove('hidden');
        }
    });
});