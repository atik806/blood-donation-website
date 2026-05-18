'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './style.css';

export default function AdminManagement() {
  const router = useRouter();
  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'admin') {
      router.push('/Login');
    }
  }, [router]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/admin', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Admins data:', data);
          setAdmins(data);
          setFilteredAdmins(data);
        } else {
          console.log('Failed to fetch admins, status:', response.status);
        }
      } catch (error) {
        console.log('Error fetching admins:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  useEffect(() => {
    let filtered = [...admins];

    if (searchTerm) {
      filtered = filtered.filter(a =>
        a.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredAdmins(filtered);
  }, [searchTerm, admins]);

  const handleEditClick = (admin) => {
    setEditingAdmin(admin);
    setFormData({
      name: admin.name,
      email: admin.email,
    });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/admin/${editingAdmin.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedAdmin = await response.json();
        setAdmins(admins.map(a => a.id === editingAdmin.id ? updatedAdmin : a));
        setShowModal(false);
        setEditingAdmin(null);
        alert('Admin updated successfully');
      } else {
        const errorData = await response.json();
        alert('Failed to update admin: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.log('Error updating admin:', error);
      alert('Error updating admin: ' + error.message);
    }
  };

  const handleDeleteAdmin = async (id) => {
    if (!confirm('Are you sure you want to delete this admin?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/admin/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setAdmins(admins.filter(a => a.id !== id));
        alert('Admin deleted successfully');
      } else {
        alert('Failed to delete admin');
      }
    } catch (error) {
      console.log('Error deleting admin:', error);
      alert('Failed to delete admin');
    }
  };

  if (loading) {
    return (
      <div className="admin-management-container loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="admin-management-container">
      {/* Header */}
      <div className="admin-management-header">
        <button
          onClick={() => router.back()}
          className="back-button"
        >
          ← Back
        </button>
        <div>
          <h1>Manage Admins</h1>
          <p>Total admins: {admins.length}</p>
        </div>
      </div>

      {/* Content */}
      <div className="admin-management-content">
        {admins.length > 0 ? (
          <>
            {/* Search */}
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Admins Table */}
            {filteredAdmins.length > 0 ? (
              <div className="admins-table-container">
                <table className="admins-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAdmins.map((admin) => (
                      <tr key={admin.id}>
                        <td className="admin-name">{admin.name}</td>
                        <td>{admin.email}</td>
                        <td className="actions-cell">
                          <button
                            onClick={() => handleEditClick(admin)}
                            className="action-btn edit-btn"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteAdmin(admin.id)}
                            className="action-btn delete-btn"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="no-results">
                <p>No admins match your search</p>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            <p className="empty-title">No admins available</p>
            <p className="empty-subtitle">No admins have been created yet</p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Admin</h2>
              <button
                onClick={() => setShowModal(false)}
                className="modal-close"
              >
                X
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleFormChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleFormChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-cancel"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="btn btn-save"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
