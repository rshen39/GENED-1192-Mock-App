import React from 'react';
import { Link } from 'react-router-dom';
import { LogoMark } from './Logo';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <LogoMark size={28} color="rgba(240,240,238,0.8)" />
            <p className="footer-brand-name" style={{ marginTop: 14 }}>Campus Cycle</p>
            <p className="footer-tagline">
              Student resale, rethought. A nonprofit marketplace for campus communities.
            </p>
            <span className="footer-nonprofit">♻️ Nonprofit · zero commissions</span>
          </div>

          <div>
            <p className="footer-col-title">Marketplace</p>
            <ul className="footer-links">
              <li><Link to="/listings">Browse listings</Link></li>
              <li><Link to="/listings">Post an item</Link></li>
              <li><Link to="/auth">Sign in</Link></li>
              <li><Link to="/profile">My profile</Link></li>
            </ul>
          </div>

          <div>
            <p className="footer-col-title">About</p>
            <ul className="footer-links">
              <li><Link to="/">How it works</Link></li>
              <li><Link to="/">Our mission</Link></li>
              <li><Link to="/">Impact</Link></li>
              <li><Link to="/">Campus expansion</Link></li>
            </ul>
          </div>

          <div>
            <p className="footer-col-title">Harvard (Pilot)</p>
            <ul className="footer-links">
              <li><a href="https://campuscycle.org">campuscycle.org</a></li>
              <li><Link to="/auth">Get started</Link></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Campus Cycle. A nonprofit student initiative.</span>
          <div className="footer-bottom-links">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#safety">Safety</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
