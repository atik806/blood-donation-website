"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


import "./style.css";

export default function UpdateAvailability() {

   const router = useRouter();
   const [donorId, setDonorId] = useState(null);
   const [formData, setFormData] =
    useState({
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
          
          available: data.available ?? true,
        });
        } catch (error) {
        console.error("Error fetching profile:", error);
      }
      };
    fetchProfile();
  }, []);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value === "true",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/donor/${donorId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Availability Updated Successfully");
        router.push("/donorDashboard");
      } else {
        alert("Failed to update availability");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <h1>Update Availability</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Select Availability Status</label>

          <br />
          <br />

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

        <br />

        <button type="submit">
          Update Status
        </button>
      </form>
    </div>
  );
}