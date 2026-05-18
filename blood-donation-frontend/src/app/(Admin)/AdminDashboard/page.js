"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./style.css";

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalPatients: 0,
    totalRequests: 0,
    availableDonors: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      router.push("/Login");
    } else if (role !== "admin") {
      router.push("/Login");
    }
  }, [router]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        // Fetch donors
        const donorsResponse = await fetch("http://localhost:3000/donor");
        const donorsData = donorsResponse.ok ? await donorsResponse.json() : [];
        const totalDonors = donorsData.length;
        const availableDonors = donorsData.filter(d => d.available).length;

        // Fetch patients
        const patientsResponse = await fetch("http://localhost:3000/patient", {
          headers,
        });
        const patientsData = patientsResponse.ok ? await patientsResponse.json() : [];
        const totalPatients = patientsData.length;

        // Fetch blood requests
        const requestsResponse = await fetch("http://localhost:3000/blood-request/all/requests", {
          headers,
        });
        const requestsData = requestsResponse.ok ? await requestsResponse.json() : [];
        const totalRequests = requestsData.length;

        setStats({
          totalDonors,
          totalPatients,
          totalRequests,
          availableDonors,
        });
      } catch (error) {
        console.log("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back! Here's your blood donation center overview.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card donors">
          <h3>Total Donors</h3>
          <p className="number">{loading ? "-" : stats.totalDonors}</p>
        </div>
        <div className="stat-card patients">
          <h3>Total Patients</h3>
          <p className="number">{loading ? "-" : stats.totalPatients}</p>
        </div>
        <div className="stat-card requests">
          <h3>Blood Requests Completed</h3>
          <p className="number">{loading ? "-" : stats.totalRequests}</p>
        </div>
        <div className="stat-card available">
          <h3>Available Donors</h3>
          <p className="number">{loading ? "-" : stats.availableDonors}</p>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section-card">
          <h2>Quick Actions</h2>
          <ul className="action-list">
            <li onClick={() => router.push("/ManageDonors")}>Manage Donors</li>
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