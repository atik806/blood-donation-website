"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./style.css";

export default function NewBloodRequest() {
  const router = useRouter();

  const [patientData, setPatientData] = useState(null);
  const [formData, setFormData] = useState({
    bloodGroup: "",
    hospital: "",
    urgency: "normal",
    phone: "",
    location: "",
    message: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/Login");
          return;
        }

        const payload = JSON.parse(atob(token.split(".")[1]));
        const res = await fetch(`http://localhost:3000/patient/${payload.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setPatientData(data);
          setFormData((prev) => ({
            ...prev,
            phone: data.phone || "",
            location: data.address || "",
          }));
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/blood-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Blood Request Created Successfully");
        router.push("/patientDashboard");
      } else {
        const errorData = await response.json();
        const msg = errorData.message
          ? (Array.isArray(errorData.message) ? errorData.message.join("\n") : errorData.message)
          : "Failed to create request";
        alert(msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div className="profile-container"><div className="profile-card">Loading...</div></div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>New Blood Request</h1>
        {patientData && (
          <div className="patient-info">
            <p><strong>Patient:</strong> {patientData.name}</p>
            <p><strong>Email:</strong> {patientData.email}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Blood Group</label>

            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          <div className="form-group">
            <label>Hospital</label>

            <input
              type="text"
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              placeholder="Enter Hospital Name"
              required
            />
          </div>

          <div className="form-group">
            <label>Urgency</label>

            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              required
            >
              <option value="normal">Normal</option>
              <option value="urgent">Urgent</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>

          <div className="form-group">
            <label>Phone Number</label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Location</label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Message</label>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write additional information"
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
          >
            Create Request
          </button>
        </form>
      </div>
    </div>
  );
}