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
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
  });
  const [editing, setEditing] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [changingPassword, setChangingPassword] = useState(false);

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

  const handleEditClick = () => {
    setEditFormData({
      name: adminData?.name || '',
      email: adminData?.email || '',
    });
    setShowEditModal(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleSaveEdit = async () => {
    if (!editFormData.name || !editFormData.email) {
      alert('Please fill in all fields');
      return;
    }

    setEditing(true);

    try {
      const token = localStorage.getItem('token');
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      const response = await fetch(`http://localhost:3000/admin/${payload.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editFormData),
      });

      if (response.ok) {
        setAdminData({
          ...adminData,
          name: editFormData.name,
          email: editFormData.email,
        });
        setShowEditModal(false);
        alert('Profile updated successfully');
      } else {
        const errorData = await response.json();
        alert('Failed to update profile: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.log('Error updating profile:', error);
      alert('Error updating profile: ' + error.message);
    } finally {
      setEditing(false);
    }
  };

  const handleCreateAdminFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePasswordFormChange = (e) => {
    const { name, value } = e.target;
    setPasswordFormData({
      ...passwordFormData,
      [name]: value,
    });
  };

  const handleChangePassword = async () => {
    if (!passwordFormData.currentPassword || !passwordFormData.newPassword || !passwordFormData.confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    if (passwordFormData.newPassword.length < 6) {
      alert('New password must be at least 6 characters');
      return;
    }

    setChangingPassword(true);

    try {
      const token = localStorage.getItem('token');
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      const response = await fetch(`http://localhost:3000/admin/${payload.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: passwordFormData.newPassword,
        }),
      });

      if (response.ok) {
        setPasswordFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setShowChangePasswordModal(false);
        alert('Password changed successfully');
      } else {
        const errorData = await response.json();
        alert('Failed to change password: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.log('Error changing password:', error);
      alert('Error changing password: ' + error.message);
    } finally {
      setChangingPassword(false);
    }
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
            <button onClick={handleEditClick} className="edit-profile-btn">
              Edit Profile
            </button>
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

            <button onClick={() => setShowChangePasswordModal(true)} className="change-password-btn">
              Change Password
            </button>
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

      {showChangePasswordModal && (
        <div className="modal-overlay" onClick={() => setShowChangePasswordModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Change Password</h2>
              <button onClick={() => setShowChangePasswordModal(false)} className="modal-close">
                X
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordFormData.currentPassword}
                  onChange={handlePasswordFormChange}
                  placeholder="Enter current password"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordFormData.newPassword}
                  onChange={handlePasswordFormChange}
                  placeholder="Enter new password (min 6 characters)"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordFormData.confirmPassword}
                  onChange={handlePasswordFormChange}
                  placeholder="Confirm new password"
                  className="form-input"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setShowChangePasswordModal(false)} className="btn btn-cancel">
                Cancel
              </button>
              <button onClick={handleChangePassword} disabled={changingPassword} className="btn btn-save">
                {changingPassword ? 'Changing...' : 'Change Password'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Profile</h2>
              <button onClick={() => setShowEditModal(false)} className="modal-close">
                X
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditFormChange}
                  placeholder="Enter admin name"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditFormChange}
                  placeholder="Enter admin email"
                  className="form-input"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setShowEditModal(false)} className="btn btn-cancel">
                Cancel
              </button>
              <button onClick={handleSaveEdit} disabled={editing} className="btn btn-save">
                {editing ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

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
                  onChange={handleCreateAdminFormChange}
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
                  onChange={handleCreateAdminFormChange}
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
                  onChange={handleCreateAdminFormChange}
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
                  onChange={handleCreateAdminFormChange}
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
