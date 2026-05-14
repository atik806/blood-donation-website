"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "./style.css";

export default function PatientDashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      router.push("/Login");
    } else if (role !== "patient") {
      router.push("/Login");
    }
  }, [router]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Patient Dashboard</h1>
        <p>Welcome back! Here's your blood request overview.</p>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <h2>Patient Information</h2>
          <div className="info-item">
            <span className="label">Name</span>
            <span className="value">John Doe</span>
          </div>
          <div className="info-item">
            <span className="label">Email</span>
            <span className="value">john@example.com</span>
          </div>
          <div className="info-item">
            <span className="label">Blood Group Required</span>
            <span className="value blood-type">B+</span>
          </div>
          <div className="info-item">
            <span className="label">Status</span>
            <span className="status-badge">Active</span>
          </div>
        </div>

        <div className="info-card">
          <h2>Request Status</h2>
          <div className="info-item">
            <span className="label">Total Requests</span>
            <span className="value">3</span>
          </div>
          <div className="info-item">
            <span className="label">Pending</span>
            <span className="value pending">1</span>
          </div>
          <div className="info-item">
            <span className="label">Fulfilled</span>
            <span className="value fulfilled">2</span>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section-card">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-btn">Update Profile</button>
            <button className="action-btn">New Blood Request</button>
            <button className="action-btn">View Request History</button>
            <button className="action-btn">Contact Donors</button>
          </div>
        </div>

        <div className="section-card">
          <h2>Recent Requests</h2>
          <ul className="request-list">
            <li>B+ blood request - Pending</li>
            <li>A- blood request - Fulfilled</li>
            <li>O+ blood request - Fulfilled</li>
          </ul>
        </div>
      </div>
    </div>
  );
}