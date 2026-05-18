'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './style.css';

export default function ManageDonors() {
    const router = useRouter();
    const [donors, setDonors] = useState([]);
    const [filteredDonors, setFilteredDonors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [editingDonor, setEditingDonor] = useState(null);
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
        const fetchDonors = async () => {
            try {
                const response = await fetch('http://localhost:3000/donor');

                if (response.ok) {
                    const data = await response.json();
                    setDonors(data);
                    setFilteredDonors(data);
                }
            } catch (error) {
                console.log('Error fetching donors:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDonors();
    }, []);

    useEffect(() => {
        let filtered = [...donors];

        if (filterStatus !== 'all') {
            filtered = filtered.filter(d =>
                filterStatus === 'available' ? d.available : !d.available
            );
        }

        if (searchTerm) {
            filtered = filtered.filter(d =>
                d.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                d.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                d.bloodGroup?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                d.phone?.includes(searchTerm)
            );
        }

        setFilteredDonors(filtered);
    }, [searchTerm, filterStatus, donors]);

    const handleEditClick = (donor) => {
        setEditingDonor(donor);
        setFormData({
            name: donor.name,
            email: donor.email,
            phone: donor.phone,
            address: donor.address,
            bloodGroup: donor.bloodGroup,
            available: donor.available,
        });
        setShowModal(true);
    };

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSaveEdit = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/donor/${editingDonor.id}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const updatedDonor = await response.json();
                setDonors(donors.map(d => d.id === editingDonor.id ? updatedDonor : d));
                setShowModal(false);
                setEditingDonor(null);
                alert('Donor updated successfully');
            } else {
                alert('Failed to update donor');
            }
        } catch (error) {
            console.log('Error updating donor:', error);
            alert('Error updating donor');
        }
    };

    const handleDeleteDonor = async (id) => {
        if (!confirm('Are you sure you want to delete this donor?')) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/donor/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                setDonors(donors.filter(d => d.id !== id));
                alert('Donor deleted successfully');
            }
        } catch (error) {
            console.log('Error deleting donor:', error);
            alert('Failed to delete donor');
        }
    };

    if (loading) {
        return (
            <div className="manage-donors-container loading">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="manage-donors-container">
            {/* Header */}
            <div className="manage-donors-header">
                <button
                    onClick={() => router.back()}
                    className="back-button"
                >
                    ← Back
                </button>
                <div>
                    <h1>Manage Donors</h1>
                    <p>Total donors: {donors.length}</p>
                </div>
            </div>

            {/* Content */}
            <div className="manage-donors-content">
                {donors.length > 0 ? (
                    <>
                        {/* Filters */}
                        <div className="filters-container">
                            <div className="search-box">
                                <input
                                    type="text"
                                    placeholder="Search by name, email, blood group, or phone..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="search-input"
                                />
                            </div>
                            <div className="filter-box">
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="all">All Status</option>
                                    <option value="available">Available</option>
                                    <option value="unavailable">Unavailable</option>
                                </select>
                            </div>
                        </div>

                        {/* Donors Table */}
                        {filteredDonors.length > 0 ? (
                            <div className="donors-table-container">
                                <table className="donors-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Blood Group</th>
                                            <th>Phone</th>
                                            <th>Address</th>
                                            <th>Status</th>
                                            <th>Donations</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredDonors.map((donor) => (
                                            <tr key={donor.id}>
                                                <td className="donor-name">{donor.name}</td>
                                                <td>{donor.email}</td>
                                                <td>
                                                    <span className="blood-badge">{donor.bloodGroup}</span>
                                                </td>
                                                <td>{donor.phone}</td>
                                                <td>{donor.address || 'N/A'}</td>
                                                <td>
                                                    <span className={`status-badge ${donor.available ? 'available' : 'unavailable'}`}>
                                                        {donor.available ? '🟢 Available' : '🔴 Unavailable'}
                                                    </span>
                                                </td>
                                                <td className="donations-count">{donor.totalDonations || 0}</td>
                                                <td className="actions-cell">
                                                    <button
                                                        onClick={() => handleEditClick(donor)}
                                                        className="action-btn edit-btn"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteDonor(donor.id)}
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
                                <p>No donors match your search</p>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="empty-state">
                        <p className="empty-title">No donors available</p>
                        <p className="empty-subtitle">No donors have registered yet</p>
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Edit Donor</h2>
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

                            <div className="form-group">
                                <label>Blood Group</label>
                                <select
                                    name="bloodGroup"
                                    value={formData.bloodGroup || ''}
                                    onChange={handleFormChange}
                                    className="form-input"
                                >
                                    <option value="">Select Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>

                            <div className="form-group checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="available"
                                        checked={formData.available || false}
                                        onChange={handleFormChange}
                                    />
                                    Available for Donation
                                </label>
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
