import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LogoWordmark } from './Logo';
import { useTheme } from '../context/ThemeContext';

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.2 3.2l1 1M11.8 11.8l1 1M11.8 3.2l-1 1M3.2 11.8l1-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path d="M13 7.5a5.5 5.5 0 1 1-6-5.48A4.5 4.5 0 0 0 13 7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

function Header({ currentUser, onLogout }) {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="nav" style={scrolled ? { borderColor: 'var(--border-mid)' } : {}}>
      <div className="nav-inner">
        <Link className="nav-logo" to="/">
          <LogoWordmark size={18} color="var(--text-1)" />
        </Link>

        <nav className="nav-links">
          <Link to="/listings" className="nav-hide">Browse</Link>
          <Link to="/" className="nav-hide">How it works</Link>
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
              <button className="nav-signin nav-button" style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={onLogout}>
                Sign out
              </button>
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
