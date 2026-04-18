import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LogoWordmark } from './Logo';
import { useTheme } from '../context/ThemeContext';

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="2.8" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.2 3.2l1 1M11.8 11.8l1 1M11.8 3.2l-1 1M3.2 11.8l1-1"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path d="M13 7.5a5.5 5.5 0 1 1-6-5.48A4.5 4.5 0 0 0 13 7.5Z"
        stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  );
}

function Header({ currentUser, onLogout }) {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header className={`nav${scrolled ? ' nav-scrolled' : ''}`}>
      <div className="nav-inner">
        <Link className="nav-logo" to="/">
          <LogoWordmark size={17} color="var(--text-1)" />
        </Link>

        <nav className="nav-links">
          <Link to="/listings">Browse</Link>
          <Link to="/#how-it-works">How it works</Link>
        </nav>

        <div className="nav-right">
          <button
            className="nav-theme-btn"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          {currentUser ? (
            <>
              <Link to="/profile" className="nav-signin">Profile</Link>
              <button className="nav-signin" onClick={onLogout}>Sign out</button>
            </>
          ) : (
            <>
              <Link to="/auth" className="nav-signin">Sign in</Link>
              <Link to="/auth" className="nav-cta">Start selling →</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
