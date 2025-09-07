import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const role = authService.getUserRole(); // Get the user's role

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    // Determine the correct dashboard path based on the user's role
    const getDashboardPath = () => {
        switch (role) {
            case 'ADMIN':
                return '/admin-dashboard';
            case 'AGENT':
                return '/agent-dashboard';
            default:
                return '/dashboard';
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">JoeTech</Link>
            </div>
            <ul className="navbar-links">
                {token ? (
                    <>
                        {/* Use the function to set the correct link */}
                        <li><Link to={getDashboardPath()}>Dashboard</Link></li>
                        <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;