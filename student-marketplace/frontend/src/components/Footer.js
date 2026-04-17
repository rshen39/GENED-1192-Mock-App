import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">

          <div>
            <div className="footer-brand-icon">CC</div>
            <p className="footer-brand-name">CampusCycle</p>
            <p className="footer-tagline">
              A nonprofit campus marketplace that keeps student goods in circulation and out of landfills.
            </p>
            <span className="footer-mission-badge">
              <span>♻️</span> 100% nonprofit · zero fees
            </span>
          </div>

          <div>
            <p className="footer-col-title">Marketplace</p>
            <ul className="footer-links">
              <li><Link to="/listings">Browse listings</Link></li>
              <li><Link to="/listings">Post an item</Link></li>
              <li><Link to="/auth">Create account</Link></li>
              <li><Link to="/profile">My profile</Link></li>
            </ul>
          </div>

          <div>
            <p className="footer-col-title">Mission</p>
            <ul className="footer-links">
              <li><Link to="/">Why it matters</Link></li>
              <li><Link to="/">Environmental impact</Link></li>
              <li><Link to="/">How it works</Link></li>
              <li><Link to="/">Our story</Link></li>
            </ul>
          </div>

          <div>
            <p className="footer-col-title">Resources</p>
            <ul className="footer-links">
              <li><a href="https://campuscycle.org" target="_blank" rel="noopener noreferrer">campuscycle.org</a></li>
              <li><Link to="/auth">Sign in</Link></li>
              <li><Link to="/listings">Senior sales</Link></li>
              <li><Link to="/">Sustainability tips</Link></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} CampusCycle. A nonprofit student initiative.</span>
          <div className="footer-bottom-links">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
