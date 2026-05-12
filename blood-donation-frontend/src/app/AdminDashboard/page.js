import "./style.css";

export default function AdminDashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back! Here's your blood donation center overview.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card donors">
          <h3>Total Donors</h3>
          <p className="number">120</p>
        </div>
        <div className="stat-card patients">
          <h3>Total Patients</h3>
          <p className="number">45</p>
        </div>
        <div className="stat-card requests">
          <h3>Blood Requests</h3>
          <p className="number">18</p>
        </div>
        <div className="stat-card available">
          <h3>Available Donors</h3>
          <p className="number">75</p>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section-card">
          <h2>Quick Actions</h2>
          <ul className="action-list">
            <li>Manage Donors</li>
            <li>Manage Patients</li>
            <li>View Blood Requests</li>
            <li>View Admin Profile</li>
          </ul>
        </div>

        <div className="section-card">
          <h2>Recent Activities</h2>
          <ul className="activity-list">
            <li>New donor registered</li>
            <li>Blood request submitted</li>
            <li>Patient account updated</li>
            <li>Donor availability updated</li>
          </ul>
        </div>
      </div>
    </div>
  );
}