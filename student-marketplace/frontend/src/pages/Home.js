import React from 'react';
import { Link } from 'react-router-dom';

const mockPhotos = {
  food:
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80',
  appliance:
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
  campus:
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
};

function Home({ currentUser }) {
  return (
    <main className="home-shell">
      <section className="apple-hero apple-section">
        <div className="hero-copy-wrap reveal-up">
          <span className="eyebrow">CampusCycle</span>
          <h1>Campus reuse, made simple.</h1>
          <p className="lede hero-lede">
            A more focused way to circulate appliances, food, and dorm essentials before they become waste.
          </p>
          <div className="button-row hero-actions">
            <Link className="button" to="/listings">
              Explore Listings
            </Link>
            {currentUser ? (
              <Link className="button-secondary" to="/profile">
                View Profile
              </Link>
            ) : (
              <Link className="button-secondary" to="/auth">
                Create Account
              </Link>
            )}
          </div>
        </div>
        <div className="hero-visual reveal-up delay-1">
          <div className="hero-device-frame">
            <div className="hero-screen-glow" />
            <div className="hero-screen">
              <div className="hero-screen-header">
                <span>CampusCycle</span>
                <span>Greater Boston</span>
              </div>
              <div className="hero-feature-card">
                <span className="tag">Featured listing</span>
                <strong>Mini fridge</strong>
                <p>Reserved locally instead of discarded at move-out.</p>
              </div>
              <div className="hero-stat-grid">
                <div className="hero-stat-card">
                  <span className="mini-label">Faster handoffs</span>
                  <strong>Local pickup</strong>
                </div>
                <div className="hero-stat-card">
                  <span className="mini-label">Lower waste</span>
                  <strong>Useful goods stay in use</strong>
                </div>
                <div className="hero-stat-card hero-stat-card-wide">
                  <span className="mini-label">CampusCycle</span>
                  <strong>Designed to make second-hand campus exchange feel clean and trusted.</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="apple-band apple-section reveal-up delay-1">
        <span className="eyebrow">Why it matters</span>
        <h2 className="section-title">A better marketplace keeps useful items in circulation.</h2>
        <p className="lede narrow center-copy">
          Students move quickly. CampusCycle helps them pass along appliances, pantry items, and dorm essentials before
          those goods become avoidable waste.
        </p>
      </section>

      <section className="simple-home-grid">
        <article className="simple-home-card reveal-up">
          <span className="eyebrow">Food Waste</span>
          <h3>Keep usable food in reach.</h3>
          <p>Pantry items and meal basics can move quickly to nearby students instead of being discarded.</p>
        </article>
        <article className="simple-home-card reveal-up delay-1">
          <span className="eyebrow">Appliance Reuse</span>
          <h3>Extend the life of what already works.</h3>
          <p>Small appliances stay valuable long after one semester ends when the handoff process is clear.</p>
        </article>
        <article className="simple-home-card reveal-up delay-2">
          <span className="eyebrow">Regional Pickup</span>
          <h3>Make local exchange feel immediate.</h3>
          <p>School, region, and area filters help students find realistic handoffs close to where they already are.</p>
        </article>
      </section>

      <section className="home-education-band">
        <div className="home-education-copy reveal-up">
          <span className="eyebrow">Further down the page</span>
          <h2 className="section-title">More context, when you want it.</h2>
          <p className="lede narrow">
            The homepage stays simple up front, then adds more educational context below for users who want to understand
            the environmental value behind reuse.
          </p>
        </div>
        <div className="home-education-visual reveal-up delay-1">
          <img className="home-education-image" src={mockPhotos.food} alt="Fresh groceries and produce on a table" />
          <img className="home-education-image secondary" src={mockPhotos.appliance} alt="A compact kitchen with reusable appliances" />
        </div>
      </section>

      <section className="insight-stage apple-section">
        <div className="insight-copy reveal-up">
          <span className="eyebrow">Educational dashboard</span>
          <h2 className="section-title">Make environmental impact easier to understand.</h2>
          <p className="lede narrow center-copy">
            Clear signals help students see that each listing can reduce unnecessary purchasing, disposal, and replacement.
          </p>
        </div>
        <div className="insight-grid">
          <article className="chart-panel reveal-up">
            <div className="chart-header">
              <span className="mini-label">Mock weekly diversion</span>
              <strong>Items redirected from waste</strong>
            </div>
            <div className="bar-chart">
              <div className="bar-group">
                <span className="bar-label">Food</span>
                <div className="bar-track">
                  <div className="bar-fill bar-food" style={{ width: '72%' }} />
                </div>
                <span className="bar-value">72%</span>
              </div>
              <div className="bar-group">
                <span className="bar-label">Appliances</span>
                <div className="bar-track">
                  <div className="bar-fill bar-appliance" style={{ width: '61%' }} />
                </div>
                <span className="bar-value">61%</span>
              </div>
              <div className="bar-group">
                <span className="bar-label">Storage</span>
                <div className="bar-track">
                  <div className="bar-fill bar-storage" style={{ width: '84%' }} />
                </div>
                <span className="bar-value">84%</span>
              </div>
            </div>
          </article>
          <article className="chart-panel chart-panel-dark reveal-up delay-1">
            <div className="chart-header">
              <span className="mini-label">Mock semester trend</span>
              <strong>Participation improves when reuse is visible</strong>
            </div>
            <div className="line-chart" aria-hidden="true">
              <div className="line-grid" />
              <div className="line-curve" />
              <div className="line-point point-one" />
              <div className="line-point point-two" />
              <div className="line-point point-three" />
              <div className="line-point point-four" />
            </div>
            <p className="muted chart-caption">
              Mock data: when reuse activity is easy to see, educational messaging becomes more actionable.
            </p>
          </article>
        </div>
      </section>

      <section className="statement-panel reveal-up">
        <span className="eyebrow">Cleaner by design</span>
        <h2 className="section-title">A simpler first page. More depth later.</h2>
        <p className="lede narrow center-copy">
          CampusCycle keeps the opening screen focused, then introduces more information as the page continues.
        </p>
      </section>

      <section className="cta-banner reveal-up">
        <span className="eyebrow">Start locally</span>
        <h2 className="section-title">Built for campus communities that want lower waste and better handoffs.</h2>
        <div className="button-row">
          <Link className="button" to="/listings">
            Browse listings
          </Link>
          <Link className="button-secondary" to="/checkout">
            View mock checkout
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
