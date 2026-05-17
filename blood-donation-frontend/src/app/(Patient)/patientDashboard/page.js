"use client";

import { useEffect, useState } from "react";
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

  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }
        const payload = JSON.parse(atob(token.split(".")[1]));
        const res = await fetch(`http://localhost:3000/patient/${payload.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          setLoading(false);
          return;
        }
        const data = await res.json();
        setPatientData(data);
      } catch (error) {
        console.error("Error fetching patient:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/Login");
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!patientData) {
    return <div className="p-8">Unable to load patient data</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Patient Dashboard</h1>
          <p>Welcome back, {patientData?.name || "Patient"}! Here&apos;s your blood request overview.</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <h2>Patient Information</h2>
          <div className="info-item">
            <span className="label">Name</span>
            <span className="value">{patientData?.name || "Loading..."}</span>
          </div>
          <div className="info-item">
            <span className="label">Email</span>
            <span className="value">{patientData?.email || "Loading..."}</span>
          </div>
          <div className="info-item">
            <span className="label">Blood Group Required</span>
            <span className="value blood-type">{patientData?.bloodGroupNeeded || "N/A"}</span>
          </div>
          <div className="info-item">
            <span className="label">Urgency</span>
            <span className="status-badge">{patientData?.urgency || "Active"}</span>
          </div>
        </div>

        <div className="info-card">
          <h2>Request Status</h2>
          <div className="info-item">
            <span className="label">Hospital</span>
            <span className="value">{patientData?.hospital || "N/A"}</span>
          </div>
          <div className="info-item">
            <span className="label">Phone</span>
            <span className="value">{patientData?.phone || "N/A"}</span>
          </div>
          <div className="info-item">
            <span className="label">Address</span>
            <span className="value">{patientData?.address || "N/A"}</span>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section-card">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-btn" onClick={() => router.push("/UpdatePatientProfile")}>Update Profile</button>
            <button className="action-btn"onClick={() => router.push("/newBloodRequest")}>New Blood Request</button>
            <button className="action-btn">View Request History</button>
            <button className="action-btn">Contact Donors</button>
          </div>
        </div>

        <div className="section-card">
          <h2>Recent Requests</h2>
          <ul className="request-list">
            <li>{patientData?.bloodGroupNeeded || "Blood"} request - {patientData?.urgency || "Pending"}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
