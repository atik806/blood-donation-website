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
      const response = await fetch("http://localhost:3000/donor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful");
        console.log(data);
        window.location.reload();
      } else {
        alert(data.message || "Registration Failed..");
        window.location.reload();
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

          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="input"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="input"
              value={formData.email}
              onChange={handleChange}
            />

            <select
              name="bloodGroup"
              className="input"
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

            <div className="radioGroup">
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
              name="role"
              className="input"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="Donor">Donor</option>
              <option value="Patient">Patient</option>
            </select>

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="input"
              value={formData.phone}
              onChange={handleChange}
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              className="input"
              value={formData.address}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input"
              value={formData.password}
              onChange={handleChange}
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
