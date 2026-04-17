import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../utils/useScrollReveal';

const photos = {
  food: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80',
  appliance: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
  campus: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
  dorm: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=900&q=80',
  waste: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=900&q=80',
};

const marqueeItems = [
  'Zero Waste Campus', 'Circular Economy', 'Peer-to-Peer Exchange',
  'Move-Out Season', 'Reduce Landfill Waste', 'Student Surplus',
  'Give Goods a Second Life', 'Campus Sustainability',
  'Zero Waste Campus', 'Circular Economy', 'Peer-to-Peer Exchange',
  'Move-Out Season', 'Reduce Landfill Waste', 'Student Surplus',
  'Give Goods a Second Life', 'Campus Sustainability',
];

function Home({ currentUser }) {
  useScrollReveal();

  return (
    <main className="home-shell">

      {/* ── HERO ──────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-bg-orb hero-bg-orb-1" />
        <div className="hero-bg-orb hero-bg-orb-2" />

        <div className="hero-eyebrow reveal visible">
          <span className="hero-eyebrow-dot" />
          Non-profit student marketplace
        </div>

        <h1 className="hero-headline reveal visible">
          Give campus goods a <span className="green-word">second life.</span>
        </h1>

        <p className="hero-subhead reveal visible delay-1">
          CampusCycle is a free marketplace for graduating students to sell dorm essentials,
          appliances, and more — keeping usable goods out of landfills.
        </p>

        <div className="hero-actions reveal visible delay-2">
          <Link className="button" to="/listings">Browse Listings</Link>
          {currentUser ? (
            <Link className="button-secondary" to="/profile">My Profile</Link>
          ) : (
            <Link className="button-secondary" to="/auth">Create Account</Link>
          )}
        </div>

        <div className="hero-stats-row reveal visible delay-3">
          <div className="hero-stat">
            <strong className="hero-stat-num">500M+</strong>
            <span className="hero-stat-label">lbs of student waste / yr</span>
          </div>
          <div className="hero-stat">
            <strong className="hero-stat-num">$350</strong>
            <span className="hero-stat-label">avg goods discarded / grad</span>
          </div>
          <div className="hero-stat">
            <strong className="hero-stat-num">85%</strong>
            <span className="hero-stat-label">could be reused or donated</span>
          </div>
          <div className="hero-stat">
            <strong className="hero-stat-num">100%</strong>
            <span className="hero-stat-label">free to use</span>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ───────────────────────────── */}
      <div className="marquee-band" aria-hidden="true">
        <div className="marquee-track">
          {marqueeItems.map((item, i) => (
            <span key={i} className="marquee-item">
              <span>●</span> {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── WASTE / ENVIRONMENTAL SECTION ─────── */}
      <section className="waste-section">
        <div className="waste-inner">
          <div className="waste-header reveal">
            <span className="eyebrow">The Problem</span>
            <h2 className="section-title">
              Every spring, campuses become one of the largest sources of preventable waste.
            </h2>
            <p className="lede">
              When students graduate or move out, millions of perfectly usable items — mini-fridges,
              furniture, clothing, food — end up in dumpsters. CampusCycle exists to change that.
            </p>
          </div>

          <div className="waste-grid">
            <article className="waste-card reveal delay-1">
              <div className="waste-card-icon">🗑️</div>
              <h3>640M lbs of trash</h3>
              <p>
                U.S. college students generate an estimated 640 million pounds of trash during
                move-out season alone — most of it from perfectly functional items.
              </p>
            </article>
            <article className="waste-card reveal delay-2">
              <div className="waste-card-icon">🏠</div>
              <h3>Dorm goods at end-of-year</h3>
              <p>
                Mini-fridges, lamps, shelving, and food — items with real value — are regularly
                left curbside or trashed because there's no easy way to pass them on quickly.
              </p>
            </article>
            <article className="waste-card reveal delay-3">
              <div className="waste-card-icon">🌱</div>
              <h3>A solvable problem</h3>
              <p>
                Studies show 85% of student move-out waste could be reused, donated, or sold.
                A trusted peer-to-peer platform is the missing piece for most campuses.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ── IMPACT NUMBERS ────────────────────── */}
      <section className="impact-section">
        <div className="impact-inner">
          <div className="impact-top reveal">
            <span className="eyebrow">Environmental Impact</span>
            <h2 className="impact-headline">
              The scale of campus waste is staggering.
            </h2>
            <p className="impact-sub">
              These aren't abstract numbers — they represent real items sitting in landfills that
              a fellow student could have used.
            </p>
          </div>

          <div className="impact-numbers reveal delay-1">
            <div className="impact-num-card">
              <strong className="impact-num">640M</strong>
              <span className="impact-num-label">pounds of trash generated by college students at move-out yearly</span>
            </div>
            <div className="impact-num-card">
              <strong className="impact-num">$350</strong>
              <span className="impact-num-label">average value of goods discarded per graduating student</span>
            </div>
            <div className="impact-num-card">
              <strong className="impact-num">4,000+</strong>
              <span className="impact-num-label">U.S. colleges and universities facing this same seasonal challenge</span>
            </div>
            <div className="impact-num-card">
              <strong className="impact-num">85%</strong>
              <span className="impact-num-label">of move-out waste that could be redirected through reuse or donation</span>
            </div>
          </div>

          <p className="impact-manifesto reveal delay-2">
            "When it's easier to throw something away than to pass it on,
            <span className="accent"> the system is broken.</span> CampusCycle fixes the system."
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────── */}
      <section className="how-section">
        <div className="how-inner">
          <div className="how-header reveal">
            <span className="eyebrow">How It Works</span>
            <h2 className="section-title">
              Three steps to keep your stuff in circulation.
            </h2>
            <p className="lede center narrow">
              CampusCycle is built for the sprint of move-out season — fast, local, and free.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card reveal delay-1">
              <div className="step-num">1</div>
              <h3>Post your listing</h3>
              <p>
                Create a free account, snap a photo, set a price (or list for free), and publish
                your item in under two minutes.
              </p>
            </div>
            <div className="step-card reveal delay-2">
              <div className="step-num">2</div>
              <h3>Get matched locally</h3>
              <p>
                Buyers filter by school, region, and campus area — so your items get in front of
                students who can actually pick them up.
              </p>
            </div>
            <div className="step-card reveal delay-3">
              <div className="step-num">3</div>
              <h3>Hand off on campus</h3>
              <p>
                Coordinate a quick campus meetup. No shipping, no fees, no waste.
                The item goes from your hands directly to someone who needs it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION ───────────────────────────── */}
      <section className="mission-section">
        <div className="mission-inner">
          <div className="mission-copy reveal">
            <span className="eyebrow">Our Mission</span>
            <h2 className="section-title">
              A nonprofit built around reducing campus waste.
            </h2>
            <p className="lede">
              CampusCycle doesn't take a cut. We're a nonprofit with one goal: make it easier
              for students to pass goods along than to throw them away.
            </p>
            <div className="mission-points">
              <div className="mission-point">
                <div className="mission-point-icon">♻️</div>
                <div className="mission-point-text">
                  <strong>Circular economy on campus</strong>
                  <span>Every sale is an item that doesn't enter the waste stream. Small acts, big impact at scale.</span>
                </div>
              </div>
              <div className="mission-point">
                <div className="mission-point-icon">💰</div>
                <div className="mission-point-text">
                  <strong>Students save real money</strong>
                  <span>Buyers get appliances and essentials at a fraction of retail. Sellers recoup moving costs.</span>
                </div>
              </div>
              <div className="mission-point">
                <div className="mission-point-icon">🤝</div>
                <div className="mission-point-text">
                  <strong>Community-first, always free</strong>
                  <span>No fees, no commissions, no ads. Just a trusted space for campus communities to exchange goods.</span>
                </div>
              </div>
              <div className="mission-point">
                <div className="mission-point-icon">🏫</div>
                <div className="mission-point-text">
                  <strong>Built for senior sale season</strong>
                  <span>Designed around the chaotic final weeks of the school year when move-out waste peaks.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mission-visual reveal delay-2">
            <img className="mission-img-main" src={photos.campus} alt="Students on a college campus" />
            <div className="mission-img-row">
              <img className="mission-img-small" src={photos.appliance} alt="Reusable dorm appliances" />
              <img className="mission-img-small" src={photos.food} alt="Food items for donation" />
            </div>
          </div>
        </div>
      </section>

      {/* ── DATA / CHARTS ─────────────────────── */}
      <section className="data-section">
        <div className="data-inner">
          <div className="data-header reveal">
            <span className="eyebrow">Educational Dashboard</span>
            <h2 className="data-headline">What reuse actually looks like, in data.</h2>
            <p className="data-sub lede">
              Mock data visualizations to help students understand the real environmental value of
              each transaction.
            </p>
          </div>

          <div className="data-grid">
            <article className="chart-panel reveal delay-1">
              <p className="chart-panel-label">Mock weekly diversion rate</p>
              <p className="chart-panel-title">Items redirected from waste by category</p>
              <div className="bar-chart">
                <div className="bar-group">
                  <span className="bar-label">Food items</span>
                  <div className="bar-track">
                    <div className="bar-fill bar-green" style={{ width: '72%' }} />
                  </div>
                  <span className="bar-value">72%</span>
                </div>
                <div className="bar-group">
                  <span className="bar-label">Appliances</span>
                  <div className="bar-track">
                    <div className="bar-fill bar-teal" style={{ width: '61%' }} />
                  </div>
                  <span className="bar-value">61%</span>
                </div>
                <div className="bar-group">
                  <span className="bar-label">Storage</span>
                  <div className="bar-track">
                    <div className="bar-fill bar-gold" style={{ width: '84%' }} />
                  </div>
                  <span className="bar-value">84%</span>
                </div>
                <div className="bar-group">
                  <span className="bar-label">Furniture</span>
                  <div className="bar-track">
                    <div className="bar-fill bar-green" style={{ width: '55%' }} />
                  </div>
                  <span className="bar-value">55%</span>
                </div>
              </div>
            </article>

            <article className="chart-panel reveal delay-2">
              <p className="chart-panel-label">Mock semester trend</p>
              <p className="chart-panel-title">Participation improves when reuse is visible</p>
              <div className="line-chart-wrap" aria-hidden="true">
                <div className="line-grid" />
                <svg className="line-svg" viewBox="0 0 400 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34c77b" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#34c77b" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 30 160 C 80 140, 120 120, 160 100 C 200 80, 240 60, 280 50 C 320 40, 360 35, 390 28"
                    fill="none"
                    stroke="#34c77b"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 30 160 C 80 140, 120 120, 160 100 C 200 80, 240 60, 280 50 C 320 40, 360 35, 390 28 L 390 200 L 30 200 Z"
                    fill="url(#lineGrad)"
                  />
                  {[[30,160],[100,130],[170,100],[240,75],[310,48],[390,28]].map(([x,y], i) => (
                    <circle key={i} cx={x} cy={y} r="5" fill="#34c77b" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                  ))}
                </svg>
              </div>
              <p className="chart-note">
                Mock data: when reuse activity is easy to see, students act on it. Visibility drives
                behavior change across campus communities.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────── */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2 className="cta-headline reveal">
            Ready to sell, or looking to buy?
          </h2>
          <p className="cta-sub reveal delay-1">
            Whether you're graduating or just settling in, CampusCycle connects your campus
            community around the goods that matter.
          </p>
          <div className="button-row" style={{ justifyContent: 'center' }}>
            <Link className="button reveal delay-2" to="/listings">Browse Listings</Link>
            {!currentUser && (
              <Link className="button-dark reveal delay-3" to="/auth">Get Started Free</Link>
            )}
          </div>
        </div>
      </section>

    </main>
  );
}

export default Home;
