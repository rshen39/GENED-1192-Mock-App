import React from 'react';
import { Link } from 'react-router-dom';

function Header({ currentUser, onLogout }) {
  return (
    <header className="site-header">
      <div className="brand-row">
        <Link className="brand-mark" to="/">
          <span className="brand-badge">CC</span>
          <span>CampusCycle</span>
        </Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/listings">Listings</Link>
          <Link to="/profile">Profile</Link>
          {currentUser ? (
            <button className="nav-button" type="button" onClick={onLogout}>
              Log out
            </button>
          ) : (
            <Link to="/auth">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
