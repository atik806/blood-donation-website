"use client";

import { useEffect, useState } from "react";
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

const [donorData, setDonorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonor = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:3000/donor/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          console.error("Failed to fetch:", response.status);
          setLoading(false);
          return;
        }
        const data = await response.json();
        console.log("Donor data:", data);
        setDonorData(data);
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDonor();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/Login");
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!donorData) {
    return <div className="p-8">Unable to load donor data</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Donor Dashboard</h1>
          <p>Welcome back, {donorData?.name || "Donor"}! Here&apos;s your donation overview.</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <h2>Donor Information</h2>
          <div className="info-item">
            <span className="label">Name</span>
            <span className="value">{donorData?.name || "Loading..."}</span>
          </div>
          <div className="info-item">
            <span className="label">Email</span>
            <span className="value">{donorData?.email || "Loading..."}</span>
          </div>
          <div className="info-item">
            <span className="label">Blood Group</span>
            <span className="value blood-type">{donorData?.bloodGroup || "N/A"}</span>
          </div>
          <div className="info-item">
            <span className="label">Status</span>
            <span className="status-badge">{donorData?.available ? "Available" : "Unavailable"}</span>
          </div>
        </div>

        <div className="info-card">
          <h2>Donation Status</h2>
          <div className="info-item">
            <span className="label">Last Donation</span>
            <span className="value">{donorData?.lastDonationDate || "N/A"}</span>
          </div>
          <div className="info-item">
            <span className="label">Total Donations</span>
            <span className="value">{donorData?.totalDonations || 0}</span>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section-card">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-btn" onClick={() => router.push("/UpdateProfile")}>Update Profile</button>
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