'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './style.css';

export default function ManagePatients() {
  const router = useRouter();
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPatient, setEditingPatient] = useState(null);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'admin') {
      router.push('/Login');
    }
  }, [router]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/patient', {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('Patient response status:', response.status);

        if (response.ok) {
          const data = await response.json();
          console.log('Patients data:', data);
          setPatients(data);
          setFilteredPatients(data);
        } else {
          const errorData = await response.json();
          console.log('Error response:', errorData);
        }
      } catch (error) {
        console.log('Error fetching patients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    let filtered = [...patients];

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.phone?.includes(searchTerm)
      );
    }

    setFilteredPatients(filtered);
  }, [searchTerm, patients]);

  const handleEditClick = (patient) => {
    setEditingPatient(patient);
    setFormData({
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      address: patient.address,
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
      const response = await fetch(`http://localhost:3000/patient/${editingPatient.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Update response status:', response.status);

      if (response.ok) {
        const updatedPatient = await response.json();
        setPatients(patients.map(p => p.id === editingPatient.id ? updatedPatient : p));
        setShowModal(false);
        setEditingPatient(null);
        alert('Patient updated successfully');
      } else {
        const errorData = await response.json();
        console.log('Update error:', errorData);
        alert('Failed to update patient: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.log('Error updating patient:', error);
      alert('Error updating patient: ' + error.message);
    }
  };

  const handleDeletePatient = async (id) => {
    if (!confirm('Are you sure you want to delete this patient?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/patient/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setPatients(patients.filter(p => p.id !== id));
        alert('Patient deleted successfully');
      }
    } catch (error) {
      console.log('Error deleting patient:', error);
      alert('Failed to delete patient');
    }
  };

  if (loading) {
    return (
      <div className="manage-patients-container loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="manage-patients-container">
      {/* Header */}
      <div className="manage-patients-header">
        <button
          onClick={() => router.back()}
          className="back-button"
        >
          ← Back
        </button>
        <div>
          <h1>Manage Patients</h1>
          <p>Total patients: {patients.length}</p>
        </div>
      </div>

      {/* Content */}
      <div className="manage-patients-content">
        {patients.length > 0 ? (
          <>
            {/* Search */}
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Patients Table */}
            {filteredPatients.length > 0 ? (
              <div className="patients-table-container">
                <table className="patients-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.map((patient) => (
                      <tr key={patient.id}>
                        <td className="patient-name">{patient.name}</td>
                        <td>{patient.email}</td>
                        <td>{patient.phone}</td>
                        <td>{patient.address || 'N/A'}</td>
                        <td className="actions-cell">
                          <button
                            onClick={() => handleEditClick(patient)}
                            className="action-btn edit-btn"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeletePatient(patient.id)}
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
                <p>No patients match your search</p>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            <p className="empty-title">No patients available</p>
            <p className="empty-subtitle">No patients have registered yet</p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Patient</h2>
              <button
                onClick={() => setShowModal(false)}
                className="modal-close"
              >
                ✕
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

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleFormChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address || ''}
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
