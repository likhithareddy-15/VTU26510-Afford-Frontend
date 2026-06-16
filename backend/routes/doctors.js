const express = require('express');
const router = express.Router();
const db = require('../data/db');

// Get all doctors
router.get('/', (req, res) => {
  res.json(db.doctors);
});

// Get doctor by ID
router.get('/:id', (req, res) => {
  const doctor = db.doctors.find(d => d.id === parseInt(req.params.id));
  if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
  res.json(doctor);
});

// Create new doctor
router.post('/', (req, res) => {
  const { name, specialty, experience, consultationFee, availability, gender, rating, about } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ message: 'Doctor name is required' });
  }
  if (!specialty || !specialty.trim()) {
    return res.status(400).json({ message: 'Specialty is required' });
  }

  const doctor = {
    id: db.doctors.length + 1,
    name: name.trim(),
    specialty: specialty.trim(),
    experience: Number(experience) || 5,
    consultationFee: Number(consultationFee) || 500,
    availability: availability || 'Available Today',
    gender: gender || 'male',
    rating: Number(rating) || 4.5,
    about: about || `Experienced practitioner specializing in ${specialty.trim()}.`
  };
  
  db.doctors.push(doctor);
  res.status(201).json(doctor);
});

module.exports = router;
