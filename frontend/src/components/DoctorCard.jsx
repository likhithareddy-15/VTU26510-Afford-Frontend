function DoctorCard({ doctor, onBook }) {
  const initials = doctor.name
    .replace("Dr. ", "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const isFemale = doctor.gender === "female";
  const isTomorrow = doctor.availability === "Available Tomorrow";
  const isUnavailable = doctor.availability === "Unavailable";

  let statusClass = "available";
  if (isTomorrow) statusClass = "tomorrow";
  if (isUnavailable) statusClass = "unavailable";

  return (
    <div className="doctor-card">
      <div className="doctor-card-body">
        <div className="doctor-main-info">
          <div className="doctor-avatar-container">
            <svg className="doctor-avatar-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id={`bgGrad-${doctor.id}`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor={isFemale ? "#f472b6" : "#38bdf8"} />
                  <stop offset="100%" stopColor={isFemale ? "#db2777" : "#0284c7"} />
                </linearGradient>
              </defs>
              <rect width="100" height="100" rx="12" fill={`url(#bgGrad-${doctor.id})`} />
              
              {/* Stylized Doctor Body Silhouette */}
              <circle cx="50" cy="38" r="16" fill="#ffffff" fillOpacity="0.9" />
              <path d="M25 78 C25 65 35 56 50 56 C65 56 75 65 75 78 V84 H25 V78 Z" fill="#ffffff" fillOpacity="0.9" />
              
              {/* Doctor Stethoscope detail */}
              <path d="M42 45 C42 52 58 52 58 45" stroke="#475569" strokeWidth="2.5" fill="none" />
              <path d="M50 50 V60" stroke="#475569" strokeWidth="2.5" />
              <circle cx="50" cy="62" r="3" fill="#0284c7" />

              {/* Initials Text */}
              <text x="50" y="43" fill="#1e293b" fontSize="10" fontWeight="bold" textAnchor="middle" style={{ userSelect: 'none' }}>
                {initials}
              </text>
            </svg>
          </div>
          
          <div className="doctor-title-block">
            <h3 className="doctor-card-name">{doctor.name}</h3>
            <span className="specialization-tag">{doctor.specialty}</span>
          </div>
        </div>

        <p className="doctor-bio">{doctor.about}</p>

        <div className="doctor-meta-grid">
          <div className="doctor-meta-item">
            <span className="doctor-meta-label">Experience</span>
            <span className="doctor-meta-value">{doctor.experience} Years</span>
          </div>
          <div className="doctor-meta-item">
            <span className="doctor-meta-label">Consultation Fee</span>
            <span className="doctor-meta-value fee">₹{doctor.consultationFee}</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="doctor-rating-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span>{doctor.rating}</span>
          </div>
          <span className={`doctor-status-badge ${statusClass}`}>
            {doctor.availability}
          </span>
        </div>

        <button 
          className="doctor-book-btn" 
          type="button"
          disabled={isUnavailable}
          onClick={() => onBook(doctor)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          Book Appointment
        </button>
      </div>
    </div>
  );
}

export default DoctorCard;