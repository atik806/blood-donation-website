"use client";

import Link from "next/link";
import "./SignUp.css";

import { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bloodGroup: "",
    gender: "",
    role: "",
    password: "",
    phone: "",
    address: "",
    available: true,
    hospital: "",
    urgency: "normal",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role) {
      alert("Please select a role");
      return;
    }

    let endpoint = "";
    let payload = formData;

    if (formData.role === "Donor") {
      endpoint = "http://localhost:3000/auth/donor/register";
    } else if (formData.role === "Patient") {
      endpoint = "http://localhost:3000/patient";
      payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        bloodGroupNeeded: formData.bloodGroup,
        phone: formData.phone,
        address: formData.address,
        hospital: formData.hospital,
        urgency: formData.urgency,
      };
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful");
        console.log(data);
        window.location.href = "/Login";
      } else {
        alert(data.message || "Registration Failed..");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Server error: " + (error.message || "Unknown error"));
    }
  };

  return (
    <div className="signup-body">
      <div className="container">
        <div className="card">
          <h1 className="title">Sign Up</h1>
          <p className="subtitle">
            Join as a donor and help save lives
          </p>

          <form className="form" onSubmit={handleSubmit} required>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="input"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="input"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <select
              name="bloodGroup"
              className="input"
              required
              value={formData.bloodGroup}
              onChange={handleChange}
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

            <div className="radioGroup" required>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={formData.gender === "Other"}
                  onChange={handleChange}
                />
                Other
              </label>
            </div>

            <select
              name="role" required
              className="input"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="Donor">Donor</option>
              <option value="Patient">Patient</option>
            </select>

            {formData.role === "Patient" && (
              <>
                <input
                  type="text"
                  name="hospital"
                  placeholder="Hospital Name"
                  className="input"
                  value={formData.hospital}
                  onChange={handleChange}
                  required
                />
                <select
                  name="urgency"
                  className="input"
                  value={formData.urgency}
                  onChange={handleChange}
                >
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgent</option>
                  <option value="emergency">Emergency</option>
                </select>
              </>
            )}

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="input"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              className="input"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className="button">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
