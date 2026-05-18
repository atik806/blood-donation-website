'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './style.css';

export default function ContactDonor() {
    const router = useRouter();
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredDonors, setFilteredDonors] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!token || role !== 'patient') {
            router.push('/Login');
        }
    }, [router]);

    useEffect(() => {
        const fetchAllDonors = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const response = await fetch(
                    `http://localhost:3000/donor`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

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

        fetchAllDonors();
    }, []);

    useEffect(() => {
        const filtered = donors.filter(donor =>
            donor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donor.bloodGroup?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donor.phone?.includes(searchTerm)
        );
        setFilteredDonors(filtered);
    }, [searchTerm, donors]);

    if (loading) {
        return (
            <div className="contact-donor-container loading">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="contact-donor-container">
            {/* Header */}
            <div className="contact-donor-header">
                <button
                    onClick={() => router.back()}
                    className="back-button"
                >
                    ← Back
                </button>
                <div>
                    <h1>Available Donors</h1>
                    <p>Total donors: {donors.length}</p>
                </div>
            </div>

            {/* Content */}
            <div className="contact-donor-content">
                {donors.length > 0 ? (
                    <>
                        {/* Search Bar */}
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Search by name, blood group, email, or phone..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>

                        {/* Donors List */}
                        {filteredDonors.length > 0 ? (
                            <div className="donors-list">
                                {filteredDonors.map((donor) => (
                                    <div key={donor.id} className="donor-card">
                                        <div className="donor-card-header">
                                            <div className="donor-info">
                                                <h3 className="donor-name">{donor.name || 'Donor'}</h3>
                                                <p className="donor-email">{donor.email || 'N/A'}</p>
                                            </div>
                                            <span className="blood-group-badge">{donor.bloodGroup || 'N/A'}</span>
                                        </div>

                                        <div className="donor-card-body">
                                            <div className="donor-detail">
                                                <span className="detail-label">Phone:</span>
                                                <span className="detail-value">{donor.phone || 'N/A'}</span>
                                            </div>
                                            <div className="donor-detail">
                                                <span className="detail-label">Address:</span>
                                                <span className="detail-value">{donor.address || 'N/A'}</span>
                                            </div>
                                            <div className="donor-detail">
                                                <span className="detail-label">Status:</span>
                                                <span className={`detail-value ${donor.available ? 'available' : 'unavailable'}`}>
                                                    {donor.available ? '🟢 Available' : '🔴 Unavailable'}
                                                </span>
                                            </div>
                                            <div className="donor-detail">
                                                <span className="detail-label">Total Donations:</span>
                                                <span className="detail-value">{donor.totalDonations || 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-results">
                                <p className="no-results-text">No donors match your search</p>
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
        </div>
    );
}
