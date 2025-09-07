import React, { useState, useEffect } from 'react';
import { getUserComplaints } from '../../services/complaintService'; // Assumes you have this service
import ComplaintItem from './ComplaintItem';
import LoadingSpinner from '../common/LoadingSpinner'; // Using the common spinner

const ComplaintList = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await getUserComplaints();
                setComplaints(response.data);
            } catch (err) {
                setError('Could not fetch complaints. Please try again later.');
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchComplaints();
    }, []); // The empty array ensures this effect runs only once on mount

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
    }

    return (
        <div className="complaint-list-container">
            <h2>Your Complaint History</h2>
            {complaints.length > 0 ? (
                complaints.map(complaint => (
                    <ComplaintItem key={complaint.id} complaint={complaint} />
                ))
            ) : (
                <p>You have not submitted any complaints yet.</p>
            )}
        </div>
    );
};

export default ComplaintList;