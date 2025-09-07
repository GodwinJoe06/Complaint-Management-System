import React, { useState, useEffect } from 'react';
import adminService from '../services/adminService'; // Create this new service file
import LoadingSpinner from '../components/common/LoadingSpinner';
import './AdminDashboardPage.css';

const StatCard = ({ title, value }) => (
    <div className="stat-card">
        <h3>{title}</h3>
        <p>{value}</p>
    </div>
);

const AdminDashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statsRes = await adminService.getStats();
                const usersRes = await adminService.getUsers();
                setStats(statsRes.data);
                setUsers(usersRes.data);
            } catch (error) {
                console.error("Failed to fetch admin data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            
            <h2>System Statistics</h2>
            <div className="stats-grid">
                {stats && <>
                    <StatCard title="Total Users" value={stats.totalUsers} />
                    <StatCard title="Total Complaints" value={stats.totalComplaints} />
                    <StatCard title="New Complaints" value={stats.newComplaints} />
                    <StatCard title="Resolved Complaints" value={stats.resolvedComplaints} />
                </>}
            </div>

            <h2>User Management</h2>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboardPage;