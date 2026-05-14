"use client";

import { useRouter } from "next/navigation";
import "./style.css";

export default function UpdateProfile() {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    data.available = data.available === "true";

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/donor/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/donorDashboard");
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="profile-container">
      <button onClick={() => router.back()} className="back-btn">
        ← Back
      </button>
      <div className="profile-card">
        <h1>Update Donor Profile</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" placeholder="Enter Name" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="Enter Email" />
          </div>

          <div className="form-group">
            <label>Blood Group</label>
            <input type="text" name="bloodGroup" placeholder="Enter Blood Group" />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input type="text" name="phone" placeholder="Enter Phone Number" />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input type="text" name="address" placeholder="Enter Address" />
          </div>

          <div className="form-group">
            <label>Availability Status</label>
            <select name="available">
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">Update Profile</button>
        </form>
      </div>
    </div>
  );
}