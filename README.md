# Doctor Appointment Booking System

A modern, full-stack healthcare dashboard built with **React** (frontend) and **Node.js/Express** (backend). This application has been optimized and stylized into a production-grade clinic management tool, perfect for assessment submissions.

---

## 🌟 Premium Features

### Frontend (React Dashboard)
* **SaaS Analytics Overview**: Four live KPI metric cards tracking *Available Doctors*, *Total Appointments*, *Queue Status*, and *Avg Clinic Rating*.
* **Interactive Specialist Directory**: Clean grid of cards displaying custom offline SVG avatars, ratings, experience, consultation fee, availability status, and booking links.
* **Sync-to-Form Scheduling**: Clicking "Book Appointment" on any doctor card automatically sets that doctor in the form, scrolls to the form, and focuses the user input.
* **Light / Dark Theme Support**: Seamless dark mode state selector that persists across page reloads via `localStorage`.
* **Dynamic Search & Filters**: Filters doctor list in real-time. Specialty dropdown options are generated dynamically from available database records.
* **UX Safety Improvements**: Date picker disables past dates (`min` attribute binding), and notifications display dismissible alerts.
* **Full Viewport Responsiveness**: Adapts dynamically across Mobile, Tablet, and Desktop screens.

### Backend (Express API)
* **Secure Date Processing**: Robust date comparisons and validations prevent booking past dates or entering corrupt date formats.
* **API Validation Middlewares**: Doctor additions and appointment bookings are subject to string sanitation and input length validation checks.
* **Clean State Synchronization**: Routes pull directly from a central database object reference, preventing state mismatch issues.

---

## 📂 Project Structure

```
├── backend/
│   ├── data/db.js            # Mock Database Configuration
│   ├── middleware/           # Express Error Handlers
│   ├── routes/               # API Routes (Appointments, Doctors)
│   └── server.js             # Server Orchestration
└── frontend/
    ├── src/
    │   ├── components/       # UI Components (DoctorCard, AppointmentForm, etc.)
    │   ├── services/api.js   # Axios API Client Setup
    │   ├── App.jsx           # Dashboard Shell & State Controller
    │   ├── index.css         # Global Theme Variables & Layout Styles
    │   └── main.jsx          # App Entrypoint
    └── index.html            # Main HTML Shell
```

---

## 🚀 Running the Project

### 1. Start the Backend
Navigate to the `/backend` directory:
```bash
cd backend
npm install
npm run dev
```
The server will run on `http://localhost:5000`.

### 2. Start the Frontend
Navigate to the `/frontend` directory:
```bash
cd frontend
npm install
npm run dev
```
The application will run on `http://localhost:5173`.
