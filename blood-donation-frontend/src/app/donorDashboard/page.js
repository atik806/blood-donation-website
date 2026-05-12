"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "./style.css";

export default function DonorDashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      router.push("/Login");
    } else if (role !== "donor") {
      router.push("/Login");
    }
  }, [router]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Donor Dashboard</h1>
        <p>Welcome back, Atik! Here's your donation overview.</p>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <h2>Donor Information</h2>
          <div className="info-item">
            <span className="label">Name</span>
            <span className="value">Atik</span>
          </div>
          <div className="info-item">
            <span className="label">Email</span>
            <span className="value">atik@gmail.com</span>
          </div>
          <div className="info-item">
            <span className="label">Blood Group</span>
            <span className="value blood-type">A+</span>
          </div>
          <div className="info-item">
            <span className="label">Status</span>
            <span className="status-badge">Available</span>
          </div>
        </div>

        <div className="info-card">
          <h2>Donation Status</h2>
          <div className="info-item">
            <span className="label">Last Donation</span>
            <span className="value">10 May 2026</span>
          </div>
          <div className="info-item">
            <span className="label">Total Donations</span>
            <span className="value">5</span>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section-card">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-btn">Update Profile</button>
            <button className="action-btn">Update Availability</button>
            <button className="action-btn">View Donation History</button>
            <button className="action-btn">View Blood Requests</button>
          </div>
        </div>

        <div className="section-card">
          <h2>Recent Requests</h2>
          <ul className="request-list">
            <li>Patient requested A+ blood</li>
            <li>Donation request accepted</li>
            <li>New emergency request received</li>
          </ul>
        </div>
      </div>
    </div>
  );
}