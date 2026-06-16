// Database configuration and connection
// This file can be used to set up your database connection

const db = {
  // Mock data for doctors
  doctors: [
    {
      id: 1,
      name: "Dr. Sarah Smith",
      specialty: "Cardiology",
      experience: 12,
      consultationFee: 1000,
      availability: "Available Today",
      gender: "female",
      rating: 4.9,
      about: "Specialist in cardiovascular diseases with over 12 years of experience at leading healthcare centers."
    },
    {
      id: 2,
      name: "Dr. David Johnson",
      specialty: "Neurology",
      experience: 15,
      consultationFee: 1200,
      availability: "Available Tomorrow",
      gender: "male",
      rating: 4.8,
      about: "Dedicated neurologist focused on neurodegenerative disorders, sleep studies, and chronic headache treatments."
    },
    {
      id: 3,
      name: "Dr. Emily Garcia",
      specialty: "Pediatrics",
      experience: 8,
      consultationFee: 800,
      availability: "Available Today",
      gender: "female",
      rating: 4.7,
      about: "Compassionate pediatrician committed to providing comprehensive healthcare for infants, children, and adolescents."
    },
    {
      id: 4,
      name: "Dr. Michael Chen",
      specialty: "Orthopedics",
      experience: 10,
      consultationFee: 950,
      availability: "Unavailable",
      gender: "male",
      rating: 4.6,
      about: "Orthopedic surgeon specializing in arthroscopy, joint replacement surgeries, and sports medicine injury recovery."
    },
    {
      id: 5,
      name: "Dr. Sophia Patel",
      specialty: "Dermatology",
      experience: 6,
      consultationFee: 750,
      availability: "Available Today",
      gender: "female",
      rating: 4.9,
      about: "Expert dermatologist specializing in clinical dermatology, acne treatments, skincare therapies, and skin wellness."
    },
    {
      id: 6,
      name: "Dr. James Wilson",
      specialty: "General Medicine",
      experience: 14,
      consultationFee: 600,
      availability: "Available Today",
      gender: "male",
      rating: 4.8,
      about: "Primary care physician focused on preventive medicine, health screenings, and managing chronic general ailments."
    }
  ],
  
  // Mock data for appointments
  appointments: [
    {
      id: 1,
      doctorId: 1,
      patientName: "John Doe",
      doctorName: "Dr. Sarah Smith",
      appointmentDate: "2026-06-20",
      status: "Scheduled"
    }
  ]
};

module.exports = db;
