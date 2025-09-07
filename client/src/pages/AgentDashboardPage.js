import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import complaintService from '../services/complaintService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './AgentDashboardPage.css';

// We can reuse the ComplaintItem styling and logic
const ComplaintItem = ({ complaint }) => {
    const navigate = useNavigate();
    const handleViewDetails = () => navigate(`/complaints/${complaint._id}`);
    
    const getStatusClass = (status) => {
        switch (status) {
            case 'NEW': return 'status-new';
            case 'IN_PROGRESS': return 'status-in-progress';
            case 'RESOLVED': return 'status-resolved';
            case 'CLOSED': return 'status-closed';
            default: return '';
        }
    };

    return (
        <div className="complaint-item" onClick={handleViewDetails}>
            <div className="complaint-item-info">
                <h3 className="complaint-title">{complaint.title}</h3>
                <p className="complaint-meta">
                    Category: {complaint.category} | Submitted: {new Date(complaint.createdAt).toLocaleDateString()}
                </p>
            </div>
            <div className="complaint-item-status">
                <span className={`status-badge ${getStatusClass(complaint.status)}`}>
                    {complaint.status.replace('_', ' ')}
                </span>
            </div>
        </div>
    );
};


const AgentDashboardPage = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAllComplaints = async () => {
            try {
                const response = await complaintService.getAllComplaints();
                setComplaints(response.data);
            } catch (err) {
                setError('Failed to fetch complaints.');
            } finally {
                setLoading(false);
            }
        };
        fetchAllComplaints();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="agent-dashboard">
            <h1>Agent Dashboard - All Complaints</h1>
            <div className="complaint-list">
                {complaints.map(complaint => (
                    <ComplaintItem key={complaint._id} complaint={complaint} />
                ))}
            </div>
        </div>
    );
};

export default AgentDashboardPage;