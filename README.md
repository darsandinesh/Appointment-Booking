# Appointment Management Application

This project is an Appointment Management Application with separate frontend and backend directories. The backend manages appointment data, while the frontend provides a user interface for interacting with the appointment system.

## Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (for backend)
- [npm](https://www.npmjs.com/) (for managing backend dependencies)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for serving the frontend `index.html`

## Setup Instructions

### Backend Setup

1. Navigate to the `Backend` folder:
    ```bash
   cd backend
   run npm install

2. To Start Server
    ```bash
    npm start

## End Points

1. GET /appointments: Fetch all appointments
    Example Response
    [
        {
            "slot": "10:00"
        },
        {
            "slot": "2:00"
        }
    ]   

2. POST /appointments: Add a new appointment
    Example Request Body
    {
        name: 'hello',
        phone: '7896541235',
        date: '2025-03-05',
        slot: '10:30'
    }

    Example Response:
    {
        "success":true,
        "message": "Appointment booked for 2025-03-05 at 10:30."
    }

### Frontend Setup

1. Navigate to the `Frontend` folder
    ```bash
    cd frontend
    Right-click index.html and select "Open with Live Server.
    The frontend will be served on a local development server


## How to Download the Project

Follow these steps to download and set up the project:

1. **Clone the repository**:

   - Open your terminal or command prompt.
   - Run the following command to clone the repository:

     ```bash
     git clone https://github.com/darsandinesh/Appointment-Booking.git
     ```

2. **Navigate to the project directory**:

   After cloning the repository, navigate into the project folder:

   ```bash
   cd appointment-system


    