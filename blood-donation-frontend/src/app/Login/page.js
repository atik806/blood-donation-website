"use client";

import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "donor",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    let endpoint = "";

    if (formData.role === "donor") {
      endpoint =
        "http://localhost:3000/auth/donor/login";
    } else if (
      formData.role === "patient"
    ) {
      endpoint =
        "http://localhost:3000/auth/patient/login";
    } else if (
      formData.role === "admin"
    ) {
      endpoint =
        "http://localhost:3000/auth/admin/login";
    }

    try {
      const reply = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await reply.json();

      if (reply.ok) {
        alert("Login Success");

        localStorage.setItem(
          "token",
          data.access_token
        );

        localStorage.setItem(
          "role",
          formData.role
        );

        
        if (formData.role === "admin") {
          window.location.href =
            "/AdminDashboard";
        } else if (
          formData.role === "donor"
        ) {
          window.location.href =
            "/donorDashboard";
        } else if (
          formData.role === "patient"
        ) {
          window.location.href =
            "/patientDashboard";
        }
      } else {
        alert(
          data.message || "Login failed"
        );
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-2">
          Login
        </h2>

        <p className="text-center text-black mb-6">
          Please enter your Email and Password
        </p>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4"
        >
          <div>
            <label className="block mb-1 font-medium text-black">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded-lg text-black"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-black">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded-lg text-black"
            />
          </div>

          {/* Role Select */}
          <div>
            <label className="block mb-1 font-medium text-black">
              Select Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded-lg text-black"
            >
              <option value="donor">
                Donor
              </option>

              <option value="patient">
                Patient
              </option>

              <option value="admin">
                Admin
              </option>
            </select>
          </div>

          
          <button
            type="submit"
            className="bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Login
          </button>

          <p className="text-center text-black text-sm">
            Don't have an account?{" "}
            <Link
              href="/Signup"
              className="text-red-600 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}