"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./style.css";



export default function UpdateProfile() {
  const router = useRouter();
  const [donorId, setDonorId] = useState(null);
  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      bloodGroup: "",
      phone: "",
      address: "",
      available: true,
    });
    useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token =
          localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:3000/donor/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setDonorId(data.id);
        setFormData({
          name: data.name || "",
          email: data.email || "",
          bloodGroup: data.bloodGroup || "",
          phone: data.phone || "",
          address: data.address || "",
          available: data.available ?? true,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "available"
          ? e.target.value === "true"
          : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/donor/${donorId}`,
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
          "/donorDashboard"
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
        <h1>Update Donor Profile</h1>

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
              name="bloodGroup"
              value={formData.bloodGroup}
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

          <div className="form-group">
            <label>
              Availability Status
            </label>

            <select
              name="available"
              value={formData.available.toString()}
              onChange={handleChange}
            >
              <option value="true">
                Available
              </option>

              <option value="false">
                Unavailable
              </option>
            </select>
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