const express = require("express");
const router = express.Router();
const db = require("../data/db");

// Get all appointments
router.get("/", (req, res) => {
  res.json(db.appointments);
});

// Create a new appointment
router.post("/", (req, res) => {
  const { patientName, doctorId, appointmentDate } = req.body;

  // 1. Validate Patient Name
  if (!patientName || !patientName.trim()) {
    return res.status(400).json({
      message: "Patient name is required",
    });
  }

  if (patientName.trim().length < 2) {
    return res.status(400).json({
      message: "Patient name must be at least 2 characters long",
    });
  }

  // 2. Validate Doctor Selection
  if (doctorId === undefined || doctorId === null || isNaN(Number(doctorId))) {
    return res.status(400).json({
      message: "A valid doctor selection is required",
    });
  }

  // 3. Validate Appointment Date
  if (!appointmentDate) {
    return res.status(400).json({
      message: "Appointment date is required",
    });
  }

  const selectedDate = new Date(appointmentDate);

  // Validate date formatting BEFORE setting hours
  if (!(selectedDate instanceof Date) || isNaN(selectedDate.getTime())) {
    return res.status(400).json({
      message: "A valid appointment date is required",
    });
  }

  // Zero-out hours for exact date comparisons (midnight comparison)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const compareDate = new Date(selectedDate);
  compareDate.setHours(0, 0, 0, 0);

  if (compareDate < today) {
    return res.status(400).json({
      message: "Appointment date cannot be in the past",
    });
  }

  // 4. Verify Doctor Exists
  const doctor = db.doctors.find((d) => d.id === Number(doctorId));

  if (!doctor) {
    return res.status(404).json({
      message: "Selected doctor was not found",
    });
  }

  // 5. Create and Store Appointment
  const appointment = {
    id: db.appointments.length + 1,
    patientName: patientName.trim(),
    doctorId: Number(doctorId),
    doctorName: doctor.name,
    appointmentDate: appointmentDate,
    status: "Scheduled"
  };

  db.appointments.push(appointment);

  res.status(201).json(appointment);
});

module.exports = router;