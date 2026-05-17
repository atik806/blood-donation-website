"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import "./style.css";

export default function UpdatePatientProfile() {
  const router = useRouter();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      bloodGroupNeeded: "",
      phone: "",
      address: "",
    });

  const getPatientIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id;
    } catch {
      return null;
    }
  };

  // Fetch Current Patient Data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const patientId = getPatientIdFromToken();
        if (!patientId) return;

        const response = await fetch(
          `http://localhost:3000/patient/${patientId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // Update Profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      const patientId = getPatientIdFromToken();
      const response = await fetch(
        `http://localhost:3000/patient/${patientId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert(
          "Profile Updated Successfully"
        );

        router.push(
          "/patientDashboard"
        );
      } else {
        alert(
          "Failed to update profile"
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="profile-container">
      <button
        onClick={() => router.back()}
        className="back-btn"
      >
        ← Back
      </button>

      <div className="profile-card">
        <h1>Update Patient Profile</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Blood Group</label>

            <input
              type="text"
              name="bloodGroupNeeded"
              value={formData.bloodGroupNeeded}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Address</label>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}