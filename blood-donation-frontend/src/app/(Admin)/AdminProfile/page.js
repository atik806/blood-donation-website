'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './style.css';

export default function AdminProfile() {
  const router = useRouter();
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'admin') {
      router.push('/Login');
    }
  }, [router]);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        // Decode JWT to get admin info
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('Admin payload:', payload);
        
        setAdminData({
          id: payload.id,
          name: payload.name || 'Admin',
          email: payload.email || 'N/A',
        });
      } catch (error) {
        console.log('Error fetching admin profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreateAdmin = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    setCreating(true);

    try {
      const response = await fetch('http://localhost:3000/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        alert('Admin created successfully');
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        setShowCreateModal(false);
      } else {
        const errorData = await response.json();
        alert('Failed to create admin: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.log('Error creating admin:', error);
      alert('Error creating admin: ' + error.message);
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-profile-container loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="admin-profile-container">
      <div className="admin-profile-header">
        <button onClick={() => router.back()} className="back-button">
          ← Back
        </button>
        <div>
          <h1>Admin Profile</h1>
          <p>Manage your admin account and create new admins</p>
        </div>
      </div>

      <div className="admin-profile-content">
        <div className="profile-card">
          <div className="card-header">
            <h2>Your Profile</h2>
          </div>

          <div className="profile-info">
            <div className="avatar">
              <div className="avatar-circle">
                {adminData?.name?.charAt(0) || 'A'}
              </div>
            </div>

            <div className="info-details">
              <div className="info-item">
                <span className="label">Name</span>
                <span className="value">{adminData?.name || 'N/A'}</span>
              </div>

              <div className="info-item">
                <span className="label">Email</span>
                <span className="value">{adminData?.email || 'N/A'}</span>
              </div>

              <div className="info-item">
                <span className="label">Role</span>
                <span className="value role-badge">Admin</span>
              </div>

              <div className="info-item">
                <span className="label">Account Status</span>
                <span className="value status-badge active">Active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="create-admin-card">
          <div className="card-header">
            <h2>Create New Admin</h2>
            <p className="subtitle">Add another administrator to the system</p>
          </div>

          <button onClick={() => setShowCreateModal(true)} className="create-admin-btn">
            + Create Admin
          </button>
        </div>
      </div>

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Admin</h2>
              <button onClick={() => setShowCreateModal(false)} className="modal-close">
                X
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Enter admin name"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="Enter admin email"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleFormChange}
                  placeholder="Enter password (min 6 characters)"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleFormChange}
                  placeholder="Confirm password"
                  className="form-input"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setShowCreateModal(false)} className="btn btn-cancel">
                Cancel
              </button>
              <button onClick={handleCreateAdmin} disabled={creating} className="btn btn-create">
                {creating ? 'Creating...' : 'Create Admin'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
