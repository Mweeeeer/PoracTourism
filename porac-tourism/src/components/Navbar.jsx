import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const { currentUser, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-brand">
          Porac<span>Tourism</span>
        </Link>
        
        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/listings" onClick={() => setIsOpen(false)}>Explore</Link>
          
          {currentUser ? (
            <>
              {isAdmin && <Link to="/admin/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>}
              <button onClick={handleLogout} className="btn btn-outline nav-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/register" className="btn btn-primary nav-btn" onClick={() => setIsOpen(false)}>Register</Link>
            </>
          )}
        </div>

        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
