import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './FormPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // --- THIS FUNCTION IS UPDATED ---
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // 1. Get the user data back from the login service
            const userData = await authService.login({ email, password });

            // 2. Check the role and navigate accordingly
            switch (userData.role) {
                case 'ADMIN':
                    navigate('/admin-dashboard');
                    break;
                case 'AGENT':
                    navigate('/agent-dashboard');
                    break;
                case 'CUSTOMER':
                default:
                    navigate('/dashboard');
                    break;
            }
        } catch (err) {
            setError('Invalid email or password. Please try again.');
            console.error('Login failed:', err);
        } finally {
            setLoading(false);
        }
    };
    // --- END OF UPDATE ---

    return (
        <div className="form-page-container">
            <div className="form-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;