"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./style.css";

export default function ViewBloodRequests() {
  const router = useRouter();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "donor") {
      router.push("/Login");
    }
  }, [router]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const response = await fetch(
          "http://localhost:3000/blood-request/pending/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blood requests");
        }

        const data = await response.json();
        setRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

 
  const accept = async (requestId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/blood-request/accept/${requestId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to accept request");
      }

      setRequests((prev) =>
        prev.map((req) =>
          req.id === requestId
            ? { ...req, status: "accepted" }
            : req
        )
      );

      router.push("/ThankYouDonor");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        Loading blood requests...
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-container error">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="requests-container">
      <div className="requests-header">
        <button onClick={() => router.back()} className="back-btn">
          ← Back
        </button>

        <div>
          <h1>Blood Requests</h1>
          <p>View all blood requests from patients</p>
        </div>
      </div>

      {requests.length === 0 ? (
        <div className="no-requests">
          <p>No blood requests available at the moment.</p>
        </div>
      ) : (
        <div className="requests-grid">
          {requests.map((req) => (
            <div key={req.id} className="request-card">
              <div className="card-header">
                <span className="blood-badge">
                  {req.bloodGroup}
                </span>
                <span className="request-id">#{req.id}</span>
              </div>

              <div className="card-body">
                <div className="detail-row">
                  <span className="detail-label">Patient</span>
                  <span className="detail-value">
                    {req.patientName}
                  </span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Hospital</span>
                  <span className="detail-value">
                    {req.hospital}
                  </span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Location</span>
                  <span className="detail-value">
                    {req.location}
                  </span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Phone</span>
                  <span className="detail-value">
                    {req.phone}
                  </span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Urgency</span>
                  <span className="detail-value">
                    {req.urgency}
                  </span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Date</span>
                  <span className="detail-value">
                    {new Date(req.requestDate).toLocaleDateString()}
                  </span>
                </div>

                {req.message && (
                  <div className="detail-row message-row">
                    <span className="detail-label">Message</span>
                    <span className="detail-value">
                      {req.message}
                    </span>
                  </div>
                )}

                <button
                  className="accept-btn"
                  onClick={() => accept(req.id)}
                  disabled={req.status === "accepted"}
                >
                  {req.status === "accepted"
                    ? "Accepted"
                    : "Accept Request"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}