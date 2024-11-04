import React, { useEffect, useState } from 'react';
import './dashboard.css';
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Dashboard = () => {
    const [username, setUsername] = useState('');
    const [initials, setInitials] = useState('');
    const navigate = useNavigate(); // Import and use navigate for redirection

    useEffect(() => {
        const storedUsername = localStorage.getItem('username') || 'Guest';
        setUsername(storedUsername);
        const initials = storedUsername.slice(0, 2).toUpperCase();
        setInitials(initials);
    }, []);

    // Logout handler function
    const handleLogout = () => {
        localStorage.removeItem('username');
        Cookies.remove('authToken');
        navigate('../login');
    };

    return (
        <div className="container-1">
            <aside className="sidebar">
                <div className="profile">
                    <div className="initials">{initials}</div>
                    <h3>Welcome Back, <span>{username}</span></h3>
                </div>
                <ul>
                    <li><Link to="../dashboard">Dashboard</Link></li>
                    <li><Link to="../text">Text to Visuals</Link></li>
                    <li><Link to="../sketch">Sketch to Reality</Link></li>
                    <li><Link to="../black">Monochrome to Color</Link></li>
                </ul>
                <button onClick={handleLogout} className="logout">Logout</button>
            </aside>

            <div className="main-content">
                <header className="dashboard-header">
                    <h2>Dashboard User</h2>
                </header>

                <section className="cards">
                    <Link to="../text" className="card">
                        <h3>From Text to Visuals</h3>
                    </Link>
                    <Link to="../sketch" className="card">
                        <h3>Sketches to Reality</h3>
                    </Link>
                    <Link to="../black" className="card">
                        <h3>From Monochrome to Multicolor</h3>
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
