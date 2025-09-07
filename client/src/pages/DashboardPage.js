import React, { useState } from 'react';
import ComplaintForm from '../components/complaint/ComplaintForm';
import ComplaintList from '../components/complaint/ComplaintList';
import './Dashboard.css';

const DashboardPage = () => {
    // This state and function can be used to refresh the list after a new submission
    const [refreshKey, setRefreshKey] = useState(0);

    const handleNewComplaint = () => {
        setRefreshKey(prevKey => prevKey + 1);
    };

    return (
        <div className="dashboard-page">
            <header className="dashboard-header">
                <h1>Customer Dashboard</h1>
                <p>Submit a new complaint or view your history below.</p>
            </header>
            <div className="dashboard-content">
                <div className="form-section">
                    <ComplaintForm onComplaintSubmitted={handleNewComplaint} />
                </div>
                <div className="list-section">
                    {/* The key prop will force ComplaintList to re-mount and re-fetch data */}
                    <ComplaintList key={refreshKey} />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;