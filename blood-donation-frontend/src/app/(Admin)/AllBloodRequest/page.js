'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './style.css';

export default function AllBloodRequest() {
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'admin') {
      router.push('/Login');
    }
  }, [router]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/blood-request/all/requests', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Blood requests:', data);
          setRequests(data);
          setFilteredRequests(data);
        }
      } catch (error) {
        console.log('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  useEffect(() => {
    let filtered = [...requests];

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(r => r.status === filterStatus);
    }

    // Search
    if (searchTerm) {
      filtered = filtered.filter(r =>
        r.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.hospital?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.bloodGroup?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.phone?.includes(searchTerm)
      );
    }

    setFilteredRequests(filtered);
  }, [searchTerm, filterStatus, requests]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return 'N/A';
    }
  };

  if (loading) {
    return (
      <div className="all-requests-container loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="all-requests-container">
      {/* Header */}
      <div className="all-requests-header">
        <button
          onClick={() => router.back()}
          className="back-button"
        >
          ← Back
        </button>
        <div>
          <h1>All Blood Requests</h1>
          <p>Total requests: {requests.length}</p>
        </div>
      </div>

      {/* Content */}
      <div className="all-requests-content">
        {requests.length > 0 ? (
          <>
            {/* Filters */}
            <div className="filters-container">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search by patient name, hospital, blood group, or phone..."
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
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  
                </select>
              </div>
            </div>

            {/* Requests Table */}
            {filteredRequests.length > 0 ? (
              <div className="requests-table-container">
                <table className="requests-table">
                  <thead>
                    <tr>
                      <th>Patient Name</th>
                      <th>Blood Group</th>
                      <th>Hospital</th>
                      <th>Phone</th>
                      <th>Location</th>
                      <th>Urgency</th>
                      <th>Status</th>
                      <th>Request Date</th>
                      <th>Donor Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.map((request) => (
                      <tr key={request.id}>
                        <td className="patient-name">{request.patientName || 'N/A'}</td>
                        <td>
                          <span className="blood-badge">{request.bloodGroup}</span>
                        </td>
                        <td>{request.hospital || 'N/A'}</td>
                        <td>{request.phone || 'N/A'}</td>
                        <td>{request.location || 'N/A'}</td>
                        <td>
                          <span className={`urgency-badge ${request.urgency?.toLowerCase()}`}>
                            {request.urgency || 'N/A'}
                          </span>
                        </td>
                        <td>
                          <span className={`status-badge ${request.status}`}>
                            {request.status === 'pending' && '⏳ Pending'}
                            {request.status === 'accepted' && '✓ Accepted'}
                            {request.status === 'completed' && '✓ Completed'}
                          </span>
                        </td>
                        <td>{formatDate(request.requestDate)}</td>
                        <td className="donor-name">{request.donorName || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="no-results">
                <p>No requests match your search</p>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            <p className="empty-title">No blood requests available</p>
            <p className="empty-subtitle">No blood requests have been submitted yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
