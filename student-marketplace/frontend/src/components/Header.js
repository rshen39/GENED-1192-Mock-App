import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Header({ currentUser, onLogout }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <Link className="brand-mark" to="/">
          <div className="brand-icon">CC</div>
          <span>CampusCycle</span>
        </Link>

        <nav className="nav-links">
          <Link to="/" className="nav-hide-mobile">Home</Link>
          <Link to="/listings">Listings</Link>
          <Link to="/profile" className="nav-hide-mobile">Profile</Link>
          {currentUser ? (
            <button className="nav-button" type="button" onClick={onLogout}>
              Log out
            </button>
          ) : (
            <Link to="/auth" className="nav-cta">
              Get started
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
