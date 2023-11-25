# Medicare - Doctor's Appointment Booking Website

Medicare is a comprehensive web application designed to facilitate seamless appointment booking between users and doctors. It provides functionalities for users, doctors, and administrators to manage appointments, profiles, and interactions within the platform.

## Features

### User Side
- **Book Appointments:** Users can easily schedule appointments with preferred doctors.
- **Profile Management:** Users have the ability to manage their profiles within the system.
- **View Bookings:** Access to view upcoming and past appointment bookings.
- **Chat with Doctor:** Allows users to communicate via chat with doctors for inquiries or follow-ups.

### Doctor Side
- **Schedule Time:** Doctors can set their availability and manage their schedules.
- **Profile Management:** Doctors can update their profiles and information.
- **Chat with User:** Enables direct communication with users for consultations or updates.
- **View Bookings:** Access to view scheduled appointments and patient information.

### Admin Side
- **Manage Doctors:** Administrators have privileges to oversee and manage doctor profiles.
- **Approve Doctors:** Approval process for new doctor registrations.
- **Manage Users:** Capability to manage user accounts and profiles.
- **View Bookings:** Access to view and oversee all bookings made on the platform.

## Technology Stack
- **Frontend:** ReactJS, Redux, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Authentication:** JSON Web Tokens (JWT)
- **Real-time Communication:** Socket.IO
- **Others:** Nodemailer,Chartjs,Datatables

## Installation

1. Clone the repository: `git clone https://github.com/yourusername/medicare.git`
2. Install dependencies for both frontend and backend:
3. Set up environment variables (e.g., database configurations, JWT secret).
4. Start the application:
- **Frontend:** `cd medicare/frontend && npm start`
- **Backend:** `cd medicare/backend && npm start`

## Contribution

We welcome contributions to enhance the features, fix bugs, or optimize the codebase. To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Make changes and commit: `git commit -am 'Add your feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Create a pull request.
