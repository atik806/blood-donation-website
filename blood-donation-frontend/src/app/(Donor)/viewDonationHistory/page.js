'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ViewDonationHistory() {
  const router = useRouter();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'donor') {
      router.push('/Login');
    }
  }, [router]);

  useEffect(() => {
    const fetchDonationHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const payload = JSON.parse(atob(token.split('.')[1]));
        const response = await fetch(
          `http://localhost:3000/blood-request/donor/${payload.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setDonations(data);
        }
      } catch (error) {
        console.log('Error fetching donation history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonationHistory();
  }, []);

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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 py-6">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => router.back()}
            className="text-red-600 hover:text-red-700 font-medium mb-4"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Donation History</h1>
          <p className="text-gray-600 mt-2">Total donations: {donations.length}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {donations.length > 0 ? (
          <div className="space-y-4">
            {donations.map((donation) => (
              <div key={donation.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{donation.hospital || 'Hospital'}</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Accepted: {formatDate(donation.acceptedDate)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm font-medium">
                      {donation.bloodGroup}
                    </span>
                    <p className="text-sm font-medium mt-2 text-green-600">
                      ✓ Accepted
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No donations yet</p>
            <p className="text-gray-500 mt-2">Your donation history will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
