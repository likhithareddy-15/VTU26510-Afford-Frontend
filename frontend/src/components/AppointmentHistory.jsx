function AppointmentHistory({ appointments }) {
  return (
    <div className="history-card">
      <div className="section-header">
        <h2 className="section-title">Appointment History</h2>
      </div>

      {appointments.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <h3>No Appointments Found</h3>
          <p>You haven't scheduled any medical consultations yet. Choose a specialist above to get started.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="history-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Doctor</th>
                <th>Scheduled Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => {
                const rawDate = appointment.appointmentDate || appointment.date;
                const formattedDate = rawDate
                  ? new Date(rawDate).toLocaleDateString("en-US", {
                      weekday: "short",
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "-";

                return (
                  <tr key={appointment.id}>
                    <td style={{ fontWeight: "600" }}>{appointment.patientName}</td>
                    <td>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontWeight: "550" }}>{appointment.doctorName || `Doctor #${appointment.doctorId}`}</span>
                        <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>ID: #{appointment.doctorId}</span>
                      </div>
                    </td>
                    <td style={{ fontWeight: "500" }}>{formattedDate}</td>
                    <td>
                      <span className="status-indicator">
                        {appointment.status || "Scheduled"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AppointmentHistory;
