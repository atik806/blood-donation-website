'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './style.css';

export default function ViewRequestHistory() {
    const router = useRouter();
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!token || role !== 'patient') {
            router.push('/Login');
        }
    }, [router]);

    useEffect(() => {
        const fetchRequestHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const payload = JSON.parse(atob(token.split('.')[1]));
                const response = await fetch(
                    `http://localhost:3000/blood-request/patient/${payload.id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setRequests(data);
                    setFilteredRequests(data);
                }
            } catch (error) {
                console.log('Error fetching request history:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRequestHistory();
    }, []);

    useEffect(() => {
        const filtered = requests.filter(request =>
            request.hospital?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.bloodGroup?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.urgency?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredRequests(filtered);
    }, [searchTerm, requests]);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString();
        } catch {
            return 'N/A';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'accepted':
                return 'status-accepted';
            case 'pending':
                return 'status-pending';
            case 'completed':
                return 'status-completed';
            default:
                return 'status-pending';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'accepted':
                return ' Accepted';
            case 'pending':
                return ' Pending';
            case 'completed':
                return ' Completed';
            default:
                return status;
        }
    };

    if (loading) {
        return (
            <div className="request-history-container loading">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="request-history-container">
            
            <div className="request-history-header">
                <button
                    onClick={() => router.back()}
                    className="back-button"
                >
                    ← Back
                </button>
                <div>
                    <h1>Request History</h1>
                    <p>Total requests: {requests.length}</p>
                </div>
            </div>

           
            <div className="request-history-content">
                {requests.length > 0 ? (
                    <>
                        
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Search by hospital, blood group, location, or urgency..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>

                        
                        {filteredRequests.length > 0 ? (
                            <div className="request-list">
                                {filteredRequests.map((request) => (
                                    <div key={request.id} className="request-card">
                                        <div className="request-card-header">
                                            <div className="request-info">
                                                <h3 className="hospital-name">{request.hospital || 'Hospital'}</h3>
                                                <p className="request-date">
                                                    Requested: {formatDate(request.requestDate)}
                                                </p>
                                            </div>
                                            <div className="request-meta">
                                                <span className="blood-group-badge">{request.bloodGroup}</span>
                                                <span className={`status-badge ${getStatusColor(request.status)}`}>
                                                    {getStatusText(request.status)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="request-card-body">
                                            <div className="request-detail">
                                                <span className="detail-label">Urgency:</span>
                                                <span className="detail-value">{request.urgency || 'N/A'}</span>
                                            </div>
                                            <div className="request-detail">
                                                <span className="detail-label">Location:</span>
                                                <span className="detail-value">{request.location || 'N/A'}</span>
                                            </div>
                                            <div className="request-detail">
                                                <span className="detail-label">Phone:</span>
                                                <span className="detail-value">{request.phone || 'N/A'}</span>
                                            </div>
                                            {request.message && (
                                                <div className="request-detail">
                                                    <span className="detail-label">Message:</span>
                                                    <span className="detail-value">{request.message}</span>
                                                </div>
                                            )}
                                        </div>

                                        {request.status === 'accepted' && request.acceptedDate && (
                                            <div className="request-card-footer">
                                                <p className="accepted-info">
                                                    Accepted on: {formatDate(request.acceptedDate)}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-results">
                                <p className="no-results-text">No requests match your search</p>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="empty-state">
                        <p className="empty-title">No requests yet</p>
                        <p className="empty-subtitle">Your request history will appear here</p>
                        <button
                            onClick={() => router.push('/newBloodRequest')}
                            className="create-request-btn">
                        
                            Create New Request
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
