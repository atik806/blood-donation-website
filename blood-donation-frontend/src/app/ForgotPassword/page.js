'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ForgotPassword() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: email/role, 2: security questions, 3: reset password
  const [formData, setFormData] = useState({
    email: '',
    role: 'donor',
    petName: '',
    favoriteColor: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFindUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let endpoint = '';
      if (formData.role === 'donor') {
        endpoint = 'http://localhost:3000/donor';
      } else if (formData.role === 'patient') {
        endpoint = 'http://localhost:3000/patient';
      }

      const response = await fetch(endpoint);
      const users = await response.json();

      const user = users.find(u => u.email === formData.email);

      if (user) {
        setUserData(user);
        setStep(2);
      } else {
        alert('User not found');
      }
    } catch (error) {
      console.log('Error:', error);
      alert('Error finding user');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyQuestions = async (e) => {
    e.preventDefault();

    const petNameMatch = formData.petName.toLowerCase() === userData.petName?.toLowerCase();
    const colorMatch = formData.favoriteColor.toLowerCase() === userData.favoriteColor?.toLowerCase();

    console.log('Debug Info:');
    console.log('Entered petName:', formData.petName);
    console.log('Stored petName:', userData.petName);
    console.log('petNameMatch:', petNameMatch);
    console.log('Entered color:', formData.favoriteColor);
    console.log('Stored color:', userData.favoriteColor);
    console.log('colorMatch:', colorMatch);

    if (!petNameMatch || !colorMatch) {
      alert('Security answers are incorrect');
      return;
    }

    setStep(3);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      let endpoint = '';
      if (formData.role === 'donor') {
        endpoint = `http://localhost:3000/donor/${userData.id}`;
      } else if (formData.role === 'patient') {
        endpoint = `http://localhost:3000/patient/${userData.id}`;
      }

      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: formData.newPassword,
        }),
      });

      if (response.ok) {
        alert('Password reset successfully');
        router.push('/Login');
      } else {
        const errorData = await response.json();
        console.log('Error response:', errorData);
        alert('Failed to reset password: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.log('Error:', error);
      alert('Error resetting password: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-2">
          Forgot Password
        </h2>

        {step === 1 && (
          <form onSubmit={handleFindUser} className="flex flex-col gap-4">
            <p className="text-center text-gray-600 mb-4">
              Enter your email and select your role
            </p>

            <div>
              <label className="block mb-1 font-medium text-black">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-400 rounded-lg text-black"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-black">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-400 rounded-lg text-black"
              >
                <option value="donor">Donor</option>
                <option value="patient">Patient</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50"
            >
              {loading ? 'Finding...' : 'Find Account'}
            </button>

            <Link href="/Login" className="text-center text-red-600 font-semibold hover:underline">
              Back to Login
            </Link>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyQuestions} className="flex flex-col gap-4">
            <p className="text-center text-gray-600 mb-4">
              Answer your security questions
            </p>

            <div>
              <label className="block mb-1 font-medium text-black">
                What is your pet name?
              </label>
              <input
                type="text"
                name="petName"
                placeholder="Enter your pet name"
                value={formData.petName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-400 rounded-lg text-black"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-black">
                What is your favourite color?
              </label>
              <input
                type="text"
                name="favoriteColor"
                placeholder="Enter your favourite color"
                value={formData.favoriteColor}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-400 rounded-lg text-black"
              />
            </div>

            <button
              type="submit"
              className="bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Verify Answers
            </button>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-center text-red-600 font-semibold hover:underline"
            >
              Back
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
            <p className="text-center text-gray-600 mb-4">
              Enter your new password
            </p>

            <div>
              <label className="block mb-1 font-medium text-black">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-400 rounded-lg text-black"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-black">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-400 rounded-lg text-black"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>

            <Link href="/Login" className="text-center text-red-600 font-semibold hover:underline">
              Back to Login
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
