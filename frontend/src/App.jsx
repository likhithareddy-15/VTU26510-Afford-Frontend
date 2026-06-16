import { useEffect, useState } from "react";
import {
  getDoctors,
  getAppointments,
  createAppointment,
} from "./services/api";
import DoctorCard from "./components/DoctorCard";
import AppointmentForm from "./components/AppointmentForm";
import AppointmentHistory from "./components/AppointmentHistory";

function App() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Track Dark Mode preference in body class
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Fetch initial clinic data
  useEffect(() => {
    Promise.all([getDoctors(), getAppointments()])
      .then(([doctorsRes, appointmentsRes]) => {
        setDoctors(doctorsRes.data);
        setAppointments(appointmentsRes.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load clinic dashboard data. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Connect DoctorCard book button click to scroll & pre-select form doctor
  const handleSelectDoctor = (doctor) => {
    setSelectedDoctorId(doctor.id);
    
    const formElement = document.getElementById("booking-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const inputElement = document.getElementById("patient-name");
        if (inputElement) inputElement.focus();
      }, 500);
    }
  };

  // Submit appointment payload to REST API
  const handleCreateAppointment = (data) => {
    createAppointment(data)
      .then((response) => {
        setAppointments((prev) => [...prev, response.data]);
        
        const formattedDate = new Date(data.appointmentDate).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        });
        
        setSuccess(`Appointment confirmed with ${data.doctorName} for ${formattedDate}!`);
        setError(""); // Clear any prior errors
        setSelectedDoctorId(""); // Reset selected state

        // Scroll to appointment table
        setTimeout(() => {
          document.querySelector(".history-card")?.scrollIntoView({ behavior: "smooth" });
        }, 800);
      })
      .catch((err) => {
        const errMsg = err.response?.data?.message || "Failed to book appointment. Please check inputs and try again.";
        setError(errMsg);
        setSuccess("");
      });
  };

  const clearSuccess = () => setSuccess("");
  const clearError = () => setError("");

  // Dismiss notification banners after 6s
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 6000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Dynamically extract unique specialties from loaded database
  const specialties = ["All", ...new Set(doctors.map((d) => d.specialty))];

  // Live filter query checks
  const filteredDoctors = doctors
    .filter((doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(search.toLowerCase())
    )
    .filter((doctor) =>
      filter === "All" ? true : doctor.specialty === filter
    );

  // Compute SaaS Dashboard Statistics
  const activeDoctorsCount = doctors.filter(d => d.availability !== "Unavailable").length;
  const totalAppointmentsCount = appointments.length;
  
  // Find chronological upcoming appointment details
  let nextPatientDetails = "No upcoming sessions";
  if (appointments.length > 0) {
    const upcoming = appointments
      .filter(a => new Date(a.appointmentDate || a.date) >= new Date().setHours(0,0,0,0))
      .sort((a, b) => new Date(a.appointmentDate || a.date) - new Date(b.appointmentDate || b.date));
    
    if (upcoming.length > 0) {
      const nextDate = new Date(upcoming[0].appointmentDate || upcoming[0].date).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short"
      });
      nextPatientDetails = `${upcoming[0].patientName} (${nextDate})`;
    }
  }

  const averageRating = doctors.length > 0 
    ? (doctors.reduce((sum, d) => sum + d.rating, 0) / doctors.length).toFixed(1)
    : "4.8";

  if (loading) {
    return (
      <div className="loader-container">
        <div className="medical-spinner" />
        <p style={{ fontWeight: "600", color: "var(--text-muted)", marginTop: "12px" }}>Loading healthcare dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header Row */}
      <header className="dashboard-header">
        <div className="brand-section">
          <div className="brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
          <h1 className="brand-name">
            Medi<span className="brand-tag">Connect</span>
          </h1>
        </div>

        <div className="header-actions">
          <button
            className="theme-toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
            title="Toggle Light/Dark Theme"
            aria-label="Toggle Light/Dark Theme"
          >
            {darkMode ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>
          
          <div className="user-profile">
            <div className="user-avatar">AD</div>
            <span className="user-name">Admin</span>
          </div>
        </div>
      </header>

      {/* SaaS Metric Summary Cards */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Available Specialists</span>
            <span className="stat-value">{activeDoctorsCount}</span>
            <span className="stat-desc">Duty rosters active</span>
          </div>
          <div className="stat-icon-wrapper blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Scheduled Consults</span>
            <span className="stat-value">{totalAppointmentsCount}</span>
            <span className="stat-desc">Booked in database</span>
          </div>
          <div className="stat-icon-wrapper green">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Next Scheduled Patient</span>
            <span className="stat-value" style={{ fontSize: "15px", marginTop: "12px", marginBottom: "8px", fontWeight: "600", color: "var(--text-main)" }}>
              {nextPatientDetails}
            </span>
            <span className="stat-desc">Chronological queue</span>
          </div>
          <div className="stat-icon-wrapper amber">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Avg Clinic Rating</span>
            <span className="stat-value">{averageRating} ★</span>
            <span className="stat-desc">Patient feedback score</span>
          </div>
          <div className="stat-icon-wrapper blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
        </div>
      </section>

      {/* Dismissible Alerts */}
      {success && (
        <div className="alert-banner success">
          <div className="alert-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span className="alert-message">{success}</span>
          </div>
          <button className="alert-close-btn" onClick={clearSuccess} aria-label="Dismiss message">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      )}

      {error && (
        <div className="alert-banner error">
          <div className="alert-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span className="alert-message">{error}</span>
          </div>
          <button className="alert-close-btn" onClick={clearError} aria-label="Dismiss error">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      )}

      {/* Two-Column Dashboard Grid */}
      <main className="main-dashboard-layout">
        {/* Left Column: Doctor Directory Grid */}
        <section className="directory-column">
          <div className="section-header">
            <h2 className="section-title">Specialist Directory</h2>
          </div>

          {/* Search/Filter Toolbar */}
          <div className="search-filter-container">
            <div className="search-input-wrapper">
              <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="search"
                placeholder="Search doctors, specializations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="filter-select-wrapper">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                aria-label="Filter doctors by specialization"
              >
                <option value="All">All Specializations</option>
                {specialties.filter(s => s !== "All").map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid Render */}
          {filteredDoctors.length === 0 ? (
            <div className="history-card" style={{ padding: "40px 20px" }}>
              <div className="empty-state">
                <div className="empty-state-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
                <h3>No Matching Specialists</h3>
                <p>Try refining your search keyword or selecting a different specialization filter.</p>
              </div>
            </div>
          ) : (
            <div className="doctors-grid">
              {filteredDoctors.map((doctor) => (
                <DoctorCard 
                  key={doctor.id} 
                  doctor={doctor} 
                  onBook={handleSelectDoctor} 
                />
              ))}
            </div>
          )}
        </section>

        {/* Right Column: Appointment Form & History Panel */}
        <section className="dashboard-sidebar">
          <AppointmentForm 
            doctors={doctors} 
            onCreate={handleCreateAppointment} 
            selectedDoctorId={selectedDoctorId} 
          />
          
          <AppointmentHistory appointments={appointments} />
        </section>
      </main>

      {/* Footer Branding */}
      <footer className="dashboard-footer">
        <p>© 2026 MediConnect Clinic Systems Inc. Suitable for Assessment Submission.</p>
        <div className="footer-links">
          <a href="#" className="footer-link">Terms of Service</a>
          <a href="#" className="footer-link">Privacy Policy</a>
          <a href="#" className="footer-link">Clinic Support</a>
        </div>
      </footer>
    </div>
  );
}

export default App;