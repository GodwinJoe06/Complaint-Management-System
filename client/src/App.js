import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ComplaintDetailPage from './pages/ComplaintDetailPage';
import authService from './services/authService';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AgentDashboardPage from './pages/AgentDashboardPage';
import AdminRoute from './components/common/AdminRoutes';
import './App.css'; // Global styles

// A wrapper component to protect routes that require authentication
const PrivateRoute = ({ children }) => {
    // Check if the user is logged in by looking for a token
    const isLoggedIn = authService.isLoggedIn();
    // If logged in, render the child component (the protected page).
    // Otherwise, redirect to the login page.
    return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <Navbar />
            <main className="main-container">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    
                    {/* Redirect root path to the dashboard if logged in, otherwise to login */}
                    <Route 
                        path="/" 
                        element={authService.isLoggedIn() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
                    />

                    {/* Protected Routes */}
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <DashboardPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/complaints/:id"
                        element={
                            <PrivateRoute>
                                <ComplaintDetailPage />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/agent-dashboard"
                        element={
                            <AdminRoute roles={['AGENT', 'ADMIN']}>
                                <AgentDashboardPage />
                            </AdminRoute>
                        }
                    />
                     <Route
                        path="/admin-dashboard"
                        element={
                            <AdminRoute roles={['ADMIN']}>
                                <AdminDashboardPage />
                            </AdminRoute>
                        }
                    />

                    {/* Fallback route for non-existent paths */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;