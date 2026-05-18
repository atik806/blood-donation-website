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
  const [bloodRequests, setBloodRequests] = useState([]);
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
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          router.push("/Login");
          return;
        }
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
  }, [router]);

  useEffect(() => {
    const fetchAcceptedRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const payload = JSON.parse(atob(token.split(".")[1]));
        const response = await fetch(
          `http://localhost:3000/blood-request/donor/${payload.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setBloodRequests(data);
        }
      } catch (error) {
        console.log("Error fetching accepted requests:", error);
      }
    };
    fetchAcceptedRequests();
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
        <div className="section-card quick-actions-card">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-btn" onClick={() => router.push("/UpdateProfile")}>Update Profile</button>
            <button className="action-btn" onClick={() => router.push("/UpdateAvailability")}>Update Availability</button>
            <button className="action-btn" onClick={() => router.push("/viewDonationHistory")}>View Donation History</button>
            <button className="action-btn" onClick={() => router.push("/viewBloodRequests")}>View Blood Requests</button>
          </div>
        </div>

        <div className="section-card requests-card">
          <h2>Your Accepted Requests ({bloodRequests.length})</h2>
          <ul className="request-list">
            {bloodRequests.length > 0 ? (
              bloodRequests.slice(0, 3).map((req) => (
                <li key={req.id}>
                  <div className="request-item">
                    <div className="request-info">
                      <span className="blood-group">{req.bloodGroup}</span>
                      <span className="hospital">{req.hospital}</span>
                    </div>
                    <span className="request-status accepted">✓ Accepted</span>
                  </div>
                </li>
              ))
            ) : (
              <li style={{ color: "black" }}>
                No accepted blood requests yet
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}