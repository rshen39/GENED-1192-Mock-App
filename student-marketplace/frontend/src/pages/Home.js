import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../utils/useScrollReveal';

const CATEGORIES = [
  { icon: '🔌', name: 'Appliances', desc: 'Mini fridges, microwaves, fans' },
  { icon: '🛋️', name: 'Furniture',  desc: 'Desks, chairs, shelving' },
  { icon: '👕', name: 'Clothing',   desc: 'All sizes, all seasons' },
  { icon: '📚', name: 'Books',      desc: 'Textbooks, course materials' },
  { icon: '🖥️', name: 'Electronics', desc: 'Monitors, keyboards, cables' },
  { icon: '🏠', name: 'Dorm Goods', desc: 'Bedding, organizers, storage' },
  { icon: '🚲', name: 'Bikes',      desc: 'Bikes, locks, gear' },
  { icon: '🍳', name: 'Kitchen',    desc: 'Cookware, utensils, pantry' },
];

function Home({ currentUser }) {
  useScrollReveal();

  return (
    <main className="home-wrap">

      {/* ════════════ HERO ════════════ */}
      <section className="hero">
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />

        <div className="hero-label reveal visible">
          <span className="hero-dot" />
          Student-only · .edu verified · Free
        </div>

        <h1 className="hero-headline reveal visible">
          Pass it on.
        </h1>

        <p className="hero-sub reveal visible d1">
          Campus Cycle is the student marketplace for buying and reselling
          dorm essentials, appliances, and gear — before they become waste.
        </p>

        <div className="btn-row hero-actions reveal visible d2">
          <Link className="btn btn-lg" to="/listings">Browse listings</Link>
          <Link className="btn btn-lg btn-ghost" to={currentUser ? '/listings' : '/auth'}>
            {currentUser ? 'Post an item' : 'Start selling'}
          </Link>
        </div>

        <div className="hero-proof reveal visible d3">
          <div className="hero-proof-item">
            <strong className="hero-proof-num">Harvard</strong>
            <span className="hero-proof-label">First campus</span>
          </div>
          <div className="hero-proof-item">
            <strong className="hero-proof-num">Free</strong>
            <span className="hero-proof-label">Always</span>
          </div>
          <div className="hero-proof-item">
            <strong className="hero-proof-num">.edu</strong>
            <span className="hero-proof-label">Verified only</span>
          </div>
          <div className="hero-proof-item">
            <strong className="hero-proof-num">Nonprofit</strong>
            <span className="hero-proof-label">No commissions</span>
          </div>
        </div>
      </section>

      {/* ════════════ HOW IT WORKS ════════════ */}
      <section className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="section-wrap">
          <div className="section-header reveal">
            <span className="eyebrow">How it works</span>
            <h2 className="h1" style={{ marginBottom: 12 }}>Three steps.</h2>
            <p className="body-lg" style={{ margin: '0 auto' }}>
              Built for the sprint of move-out season. Fast, local, zero friction.
            </p>
          </div>

          <div className="steps">
            <div className="step reveal d1">
              <div className="step-num">1</div>
              <h3>Create your account</h3>
              <p>Sign up with your .edu email. Verification keeps the marketplace student-only and trusted.</p>
            </div>
            <div className="step reveal d2">
              <div className="step-num">2</div>
              <h3>List or browse</h3>
              <p>Post an item in minutes or search listings from students at your school, filtered by category and area.</p>
            </div>
            <div className="step reveal d3">
              <div className="step-num">3</div>
              <h3>Hand off on campus</h3>
              <p>Meet nearby. No shipping, no fees. The item moves from one student to the next.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ CATEGORIES ════════════ */}
      <section className="section categories-section">
        <div className="section-wrap">
          <div className="section-header reveal" style={{ marginBottom: 48 }}>
            <span className="eyebrow">What's available</span>
            <h2 className="h1" style={{ marginBottom: 10 }}>Every category covered.</h2>
            <p className="body-lg" style={{ margin: '0 auto' }}>
              From mini-fridges to bikes — if a student owns it, it belongs here.
            </p>
          </div>

          <div className="categories-grid">
            {CATEGORIES.map((cat, i) => (
              <Link
                key={cat.name}
                to={`/listings?category=${cat.name}`}
                className={`category-card reveal d${Math.min(i % 4 + 1, 4)}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="category-icon">{cat.icon}</div>
                <h3>{cat.name}</h3>
                <p>{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ WASTE / PAUSE SECTION ════════════ */}
      <section className="waste-section">
        <div className="waste-inner">
          <div className="waste-copy reveal">
            <span className="eyebrow">Every May</span>
            <h2 className="waste-headline">
              Most of it gets<br />thrown away.
            </h2>
            <p className="waste-sub">
              When students move out, perfectly good items end up in dumpsters.
              Not because they're worthless — because there's no easy way to pass them on.
            </p>
            <blockquote className="waste-statement">
              "It doesn't have to end up in a landfill.<br />
              It just needs somewhere to go."
            </blockquote>
          </div>

          <div className="waste-nums reveal d2">
            <div className="waste-num-row">
              <span className="waste-num-val">640M</span>
              <span className="waste-num-desc">pounds of student waste generated at move-out each year in the U.S.</span>
            </div>
            <div className="waste-num-row">
              <span className="waste-num-val">$350</span>
              <span className="waste-num-desc">average value of items discarded per graduating student</span>
            </div>
            <div className="waste-num-row">
              <span className="waste-num-val">85%</span>
              <span className="waste-num-desc">of move-out waste that could be reused or donated instead</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ TRUST ════════════ */}
      <section className="section trust-section">
        <div className="section-wrap">
          <div className="section-header reveal">
            <span className="eyebrow">Built for trust</span>
            <h2 className="h1" style={{ marginBottom: 10 }}>Student-only. By design.</h2>
            <p className="body-lg" style={{ margin: '0 auto' }}>
              No strangers. No public listings. Just your campus community.
            </p>
          </div>

          <div className="trust-grid">
            <div className="trust-card reveal d1">
              <div className="trust-icon">✉️</div>
              <h3>.edu verification</h3>
              <p>Every account is tied to a valid university email. If you're not a student, you can't list or buy.</p>
            </div>
            <div className="trust-card reveal d2">
              <div className="trust-icon">📍</div>
              <h3>Campus-local only</h3>
              <p>Listings are filtered to your school and region. You're always buying from someone nearby.</p>
            </div>
            <div className="trust-card reveal d3">
              <div className="trust-icon">♻️</div>
              <h3>Nonprofit, no commissions</h3>
              <p>Campus Cycle takes nothing. Every dollar of your sale goes directly to you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ FINAL CTA ════════════ */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2 className="cta-headline reveal">
            Keep it in circulation.
          </h2>
          <p className="cta-sub reveal d1">
            List what you no longer need. Find what you're looking for.
            Same campus, same community.
          </p>
          <div className="btn-row reveal d2" style={{ justifyContent: 'center' }}>
            <Link className="btn btn-lg" to="/listings">Browse listings</Link>
            <Link className="btn btn-lg btn-ghost" to={currentUser ? '/listings' : '/auth'}>
              {currentUser ? 'Post an item' : 'Create account'}
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

export default Home;
