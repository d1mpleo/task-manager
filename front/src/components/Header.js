// components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ description }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/signin');
    };

    return (
        <div style={styles.wrapper}>
            <header style={styles.header}>
                <div style={styles.container}>
                    <Link to="/" style={styles.logo}>
                        <h1 style={styles.title}>{description}</h1>
                    </Link>
                    
                    <nav style={styles.nav}>
                        <Link to="/tasks" style={styles.navLink}>Задачі</Link>
                        {!token ? (
                            <>
                                <Link to="/signin" style={styles.navLink}>Вхід</Link>
                                <Link to="/signup" style={styles.navLink}>Реєстрація</Link>
                            </>
                        ) : (
                            <button onClick={handleLogout} style={styles.logoutButton}>
                                Вийти
                            </button>
                        )}
                    </nav>
                </div>
            </header>
        </div>
    );
};

const styles = {
    wrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '20px 0',

    },
    header: {
        width: '90%',
        maxWidth: '1200px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '60px',
        padding: '10px 30px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logo: {
        textDecoration: 'none'
    },
    title: {
        margin: 0,
        fontSize: '24px',
        color: '#333',
        fontWeight: '600'
    },
    nav: {
        display: 'flex',
        gap: '20px',
        alignItems: 'center'
    },
    navLink: {
        textDecoration: 'none',
        color: '#555',
        fontSize: '16px',
        fontWeight: '500',
        padding: '8px 16px',
        borderRadius: '30px',
        transition: 'all 0.3s'
    },
    logoutButton: {
        padding: '8px 20px',
        backgroundColor: '#ff4757',
        color: 'white',
        border: 'none',
        borderRadius: '30px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '500',
        transition: 'background-color 0.3s'
    }
};

export default Header;