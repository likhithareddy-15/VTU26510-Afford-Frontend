import { useState, useEffect } from "react";

function AppointmentForm({ doctors, onCreate, selectedDoctorId }) {
  const [patientName, setPatientName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [formError, setFormError] = useState("");

  // Sync selectedDoctorId from Doctor Card clicks
  useEffect(() => {
    if (selectedDoctorId) {
      setDoctorId(selectedDoctorId);
    } else if (doctors.length > 0 && !doctorId) {
      // Find the first available doctor to default selection
      const firstAvailable = doctors.find(d => d.availability !== "Unavailable");
      setDoctorId(firstAvailable ? firstAvailable.id : doctors[0].id);
    }
  }, [selectedDoctorId, doctors]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!patientName.trim()) {
      setFormError("Patient name is required.");
      return;
    }

    if (patientName.trim().length < 2) {
      setFormError("Patient name must be at least 2 characters.");
      return;
    }

    if (!appointmentDate) {
      setFormError("Appointment date is required.");
      return;
    }

    const selectedDate = new Date(appointmentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setFormError("Appointment date cannot be in the past.");
      return;
    }

    const selectedDoctor = doctors.find(
      (doctor) => doctor.id === Number(doctorId)
    );

    if (!selectedDoctor) {
      setFormError("Please select a valid doctor.");
      return;
    }

    if (selectedDoctor.availability === "Unavailable") {
      setFormError("The selected doctor is unavailable. Please choose another.");
      return;
    }

    onCreate({
      patientName: patientName.trim(),
      appointmentDate,
      doctorId: Number(doctorId),
      doctorName: selectedDoctor.name,
    });

    setPatientName("");
    setAppointmentDate("");
    setFormError("");
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <form className="form-card" onSubmit={handleSubmit} id="booking-form">
      <div className="section-header" style={{ marginBottom: "8px" }}>
        <h2 className="section-title">Book Appointment</h2>
      </div>
      <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "-12px", marginBottom: "8px" }}>
        Enter the patient details and choose a preferred schedule.
      </p>

      {formError && (
        <div className="alert-banner error" style={{ padding: "10px 14px", fontSize: "13px" }}>
          <div className="alert-content">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span className="alert-message">{formError}</span>
          </div>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="patient-name">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          Patient Name
        </label>
        <input
          id="patient-name"
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          placeholder="Enter patient full name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="appointment-date">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          Appointment Date
        </label>
        <input
          id="appointment-date"
          type="date"
          value={appointmentDate}
          min={todayStr}
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="doctor-select">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
          Select Doctor
        </label>
        <select
          id="doctor-select"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          required
        >
          <option value="" disabled>-- Select a Doctor --</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id} disabled={doctor.availability === "Unavailable"}>
              {doctor.name} ({doctor.specialty}) {doctor.availability === "Unavailable" ? "[Unavailable]" : ""}
            </option>
          ))}
        </select>
      </div>

      <button className="submit-btn" type="submit">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        Confirm Appointment
      </button>
    </form>
  );
}

export default AppointmentForm;
