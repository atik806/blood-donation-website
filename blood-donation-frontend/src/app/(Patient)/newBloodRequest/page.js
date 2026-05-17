"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./style.css";

export default function NewBloodRequest() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    patientName: "",
    bloodGroup: "",
    hospital: "",
    location: "",
    contactNumber: "",
    requestDate: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/blood-request",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
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

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>New Blood Request</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Patient Name
            </label>

            <input
              type="text"
              name="patientName"
              value={
                formData.patientName
              }
              onChange={handleChange}
              placeholder="Enter Patient Name"
            />
          </div>

          <div className="form-group">
            <label>
              Blood Group
            </label>

            <input
              type="text"
              name="bloodGroup"
              value={
                formData.bloodGroup
              }
              onChange={handleChange}
              placeholder="Enter Blood Group"
            />
          </div>

          <div className="form-group">
            <label>Hospital</label>

            <input
              type="text"
              name="hospital"
              value={
                formData.hospital
              }
              onChange={handleChange}
              placeholder="Enter Hospital Name"
            />
          </div>

          <div className="form-group">
            <label>Location</label>

            <input
              type="text"
              name="location"
              value={
                formData.location
              }
              onChange={handleChange}
              placeholder="Enter Location"
            />
          </div>

          <div className="form-group">
            <label>
              Contact Number
            </label>

            <input
              type="text"
              name="contactNumber"
              value={
                formData.contactNumber
              }
              onChange={handleChange}
              placeholder="Enter Contact Number"
            />
          </div>

          <div className="form-group">
            <label>
              Request Date
            </label>

            <input
              type="date"
              name="requestDate"
              value={
                formData.requestDate
              }
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Message</label>

            <textarea
              name="message"
              value={
                formData.message
              }
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