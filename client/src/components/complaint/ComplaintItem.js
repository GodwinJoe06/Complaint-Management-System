import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ComplaintItem.css';

const ComplaintItem = ({ complaint }) => {
    const navigate = useNavigate();

    // The handler function that navigates to the detail page
    const handleViewDetails = () => {
        // --- THIS IS THE FIX ---
        // Change complaint.id to complaint._id
        navigate(`/complaints/${complaint._id}`);
    };
    
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

export default ComplaintItem;