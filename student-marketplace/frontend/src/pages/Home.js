import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from '../utils/useInView';

/* ── Animation helpers ──────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function AnimSection({ children, className, style, delay = 0.1 }) {
  const ctrl = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => { if (inView) ctrl.start('show'); }, [inView, ctrl]);
  return (
    <motion.div ref={ref} className={className} style={style}
      initial="hidden" animate={ctrl}
      variants={{ hidden: {}, show: { transition: { staggerChildren: delay } } }}>
      {children}
    </motion.div>
  );
}

function FadeItem({ children, className, style }) {
  return <motion.div className={className} style={style} variants={fadeUp}>{children}</motion.div>;
}

/* ── Marquee ────────────────────────────────────────────── */
const MARQUEE_ITEMS = ['Harvard Pilot','.edu Verified','Zero Commissions','Free to Use','Nonprofit','Campus Meetup Only','Pass It On','Move-Out Ready'];

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} className="marquee-item">{item}<span className="marquee-sep" /></span>
        ))}
      </div>
    </div>
  );
}

/* ── Phone mockup ───────────────────────────────────────── */
function PhoneMockup() {
  const listings = [
    { title: 'Mini Fridge — Like New', price: '$45', color: '#22c55e', img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=200&q=70&auto=format&fit=crop' },
    { title: 'IKEA Desk + Chair', price: '$80', color: '#818cf8', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=70&auto=format&fit=crop' },
    { title: 'CS50 Textbook Set', price: '$25', color: '#f59e0b', img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&q=70&auto=format&fit=crop' },
  ];

  return (
    <div className="phone-wrap">
      <div className="phone-frame">
        {/* Dynamic Island */}
        <div className="phone-island" />
        <div className="phone-screen">
          {/* App header */}
          <div className="phone-app-header">
            <span className="phone-app-logo">Campus Cycle</span>
            <div className="phone-avatar" />
          </div>
          {/* Search bar */}
          <div className="phone-search">
            <span className="phone-search-icon">⌕</span>
            <span className="phone-search-placeholder">Search listings…</span>
          </div>
          {/* Tags */}
          <div className="phone-tags">
            {['All','Furniture','Electronics','Books'].map(t => (
              <span key={t} className={`phone-tag${t === 'All' ? ' phone-tag-active' : ''}`}>{t}</span>
            ))}
          </div>
          {/* Listing cards */}
          <div className="phone-listings">
            {listings.map((l, i) => (
              <div key={i} className="phone-listing-row">
                <div className="phone-listing-img" style={{ backgroundImage: `url(${l.img})` }} />
                <div className="phone-listing-info">
                  <span className="phone-listing-title">{l.title}</span>
                  <span className="phone-listing-meta">Harvard · .edu verified</span>
                </div>
                <span className="phone-listing-price" style={{ color: l.color }}>{l.price}</span>
              </div>
            ))}
          </div>
          {/* Bottom nav */}
          <div className="phone-nav-bar">
            {['⊞','♡','＋','⊙'].map((icon, i) => (
              <span key={i} className={`phone-nav-icon${i === 0 ? ' active' : ''}`}>{icon}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Floating UI cards around the phone */}
      <motion.div
        className="float-card float-card-1"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="float-card-icon" style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80' }}>✓</div>
        <div className="float-card-text">
          <span className="float-card-title">.edu Verified</span>
          <span className="float-card-sub">harvard.edu</span>
        </div>
      </motion.div>

      <motion.div
        className="float-card float-card-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <div className="float-card-icon" style={{ background: 'rgba(129,140,248,0.15)', color: '#818cf8' }}>📍</div>
        <div className="float-card-text">
          <span className="float-card-title">Campus meetup</span>
          <span className="float-card-sub">Confirmed · 2 min away</span>
        </div>
      </motion.div>

      <motion.div
        className="float-card float-card-3"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="float-card-icon" style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', flexShrink: 0 }}>$</div>
          <div className="float-card-text">
            <span className="float-card-title">0% commission</span>
            <span className="float-card-sub">You keep everything</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Category cards ─────────────────────────────────────── */
const CATEGORIES = [
  { icon: '🔌', name: 'Appliances',  desc: 'Fridges, fans, microwaves', gradient: 'linear-gradient(135deg, #ea580c, #dc2626)' },
  { icon: '🛋️', name: 'Furniture',   desc: 'Desks, chairs, shelving',   gradient: 'linear-gradient(135deg, #2563eb, #7c3aed)' },
  { icon: '👕', name: 'Clothing',    desc: 'All sizes, all seasons',     gradient: 'linear-gradient(135deg, #be185d, #7c3aed)' },
  { icon: '📚', name: 'Books',       desc: 'Textbooks, course reads',    gradient: 'linear-gradient(135deg, #d97706, #b45309)' },
  { icon: '🖥️', name: 'Electronics', desc: 'Monitors, keyboards, cables',gradient: 'linear-gradient(135deg, #0891b2, #1d4ed8)' },
  { icon: '🏠', name: 'Dorm Goods',  desc: 'Bedding, storage, organizers',gradient: 'linear-gradient(135deg, #059669, #0891b2)' },
  { icon: '🚲', name: 'Bikes',       desc: 'Bikes, locks, helmets',      gradient: 'linear-gradient(135deg, #16a34a, #15803d)' },
  { icon: '🍳', name: 'Kitchen',     desc: 'Cookware, utensils, pantry', gradient: 'linear-gradient(135deg, #c2410c, #ea580c)' },
];

/* ── Feature rows ───────────────────────────────────────── */
const FEATURES = [
  { num: '01', title: 'Student-only, by design.', body: 'Every account is tied to a verified .edu address. No exceptions, no workarounds — the marketplace stays trusted because access is earned.' },
  { num: '02', title: 'Zero commissions. Ever.', body: 'Campus Cycle is nonprofit. We take nothing from your sale. Every dollar goes directly from buyer to seller.' },
  { num: '03', title: 'Hand to hand on campus.', body: 'No shipping labels. No strangers. Agree on a spot, meet nearby, exchange in minutes.' },
];

/* ── Main ───────────────────────────────────────────────── */
export default function Home({ currentUser }) {
  const heroCtrl = useAnimation();
  const [heroRef, heroInView] = useInView();
  useEffect(() => { if (heroInView) heroCtrl.start('show'); }, [heroInView, heroCtrl]);

  const heroBg = {
    backgroundImage: [
      'radial-gradient(circle, rgba(255,255,255,0.022) 1px, transparent 1px)',
      'linear-gradient(180deg, rgba(6,6,8,0.82) 0%, rgba(6,6,8,0.50) 45%, rgba(6,6,8,0.90) 100%)',
      'url(/harvard-night.jpg)',
    ].join(', '),
    backgroundSize: '28px 28px, 100% 100%, cover',
    backgroundPosition: '0 0, 0 0, center top',
    backgroundRepeat: 'repeat, no-repeat, no-repeat',
  };

  return (
    <main className="home-wrap">

      {/* ══════ HERO ══════ */}
      <section className="hero hero-split" ref={heroRef} style={heroBg}>
        {/* Green glow sphere */}
        <div className="hero-glow-sphere" aria-hidden="true" />

        <div className="hero-split-inner">
          {/* Left — text */}
          <div className="hero-text-col">
            <motion.div className="hero-label"
              initial={{ opacity: 0, y: 14 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: [0.22,1,0.36,1] }}>
              <span className="hero-dot" />Harvard pilot · .edu only
            </motion.div>

            <motion.h1 className="hero-headline"
              initial={{ opacity: 0, y: 44 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, ease: [0.22,1,0.36,1], delay: 0.08 }}>
              Pass it on.
            </motion.h1>

            <motion.p className="hero-sub"
              initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease: [0.22,1,0.36,1], delay: 0.18 }}>
              The student-only campus marketplace for buying and reselling dorm essentials — before they become waste.
            </motion.p>

            <motion.div className="btn-row"
              initial={{ opacity: 0, y: 18 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22,1,0.36,1], delay: 0.26 }}>
              <Link className="btn btn-lg" to="/listings">Browse listings</Link>
              <Link className="btn btn-lg btn-ghost" to={currentUser ? '/listings' : '/auth'}>
                {currentUser ? 'Post an item' : 'Start selling'}
              </Link>
            </motion.div>

            <motion.div className="hero-stats"
              initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.38 }}>
              {[{val:'Harvard',label:'Pilot campus'},{val:'0%',label:'Commission'},{val:'.edu',label:'Verified'},{val:'Free',label:'Always'}].map(({val,label}) => (
                <div className="hero-stat" key={label}>
                  <strong className="hero-stat-val">{val}</strong>
                  <span className="hero-stat-label">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — phone */}
          <motion.div className="hero-phone-col"
            initial={{ opacity: 0, y: 48, scale: 0.94 }}
            animate={heroInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.0, ease: [0.22,1,0.36,1], delay: 0.3 }}>
            <PhoneMockup />
          </motion.div>
        </div>
      </section>

      {/* ══════ MARQUEE ══════ */}
      <Marquee />

      {/* ══════ FEATURES ══════ */}
      <section className="features-section">
        <div className="section-wrap">
          <AnimSection>
            <FadeItem className="features-header">
              <span className="eyebrow">The platform</span>
              <h2 className="h1" style={{ marginBottom: 14 }}>
                The campus marketplace,<br />built the right way.
              </h2>
              <p className="body-lg" style={{ margin: '0 auto' }}>
                Designed specifically for the rhythms of student life — fast to list, safe to buy, free to use.
              </p>
            </FadeItem>
          </AnimSection>

          <AnimSection>
            <motion.div className="features-grid"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.13 } } }}>
              {FEATURES.map(({ num, title, body }) => (
                <motion.div key={num} className="feature-card" variants={fadeUp}>
                  <div className="feature-num">{num}</div>
                  <h3 className="feature-title">{title}</h3>
                  <p className="feature-body">{body}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimSection>
        </div>
      </section>

      {/* ══════ CATEGORY GRID ══════ */}
      <section className="cat-section">
        <div className="section-wrap">
          <AnimSection>
            <FadeItem className="features-header">
              <span className="eyebrow">What's available</span>
              <h2 className="h1" style={{ marginBottom: 14 }}>Everything a student needs.</h2>
              <p className="body-lg" style={{ margin: '0 auto' }}>
                Eight categories. One campus. Whatever you're looking for, someone nearby has it.
              </p>
            </FadeItem>

            <motion.div className="cat-grid"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}>
              {CATEGORIES.map(({ icon, name, desc, gradient }) => (
                <motion.div key={name} variants={fadeUp}>
                  <Link to={`/listings?category=${name}`} className="cat-card" style={{ '--cat-gradient': gradient }}>
                    <div className="cat-card-glow" />
                    <span className="cat-card-icon">{icon}</span>
                    <span className="cat-card-name">{name}</span>
                    <span className="cat-card-desc">{desc}</span>
                    <span className="cat-card-arrow">→</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimSection>
        </div>
      </section>

      {/* ══════ PHOTO MOMENT ══════ */}
      <section className="photo-moment" style={{
        backgroundImage: [
          'linear-gradient(105deg, rgba(6,6,8,0.94) 0%, rgba(6,6,8,0.75) 55%, rgba(6,6,8,0.52) 100%)',
          'url(/move-out.jpg)',
        ].join(', '),
        backgroundSize: '100% 100%, cover',
        backgroundPosition: '0 0, center center',
        backgroundRepeat: 'no-repeat, no-repeat',
      }}>
        <div className="photo-moment-inner">
          <AnimSection>
            <FadeItem><div className="photo-moment-eyebrow">Every end of semester</div></FadeItem>
            <FadeItem><h2 className="photo-moment-headline">Before the<br />dumpsters.</h2></FadeItem>
            <FadeItem>
              <p className="photo-moment-sub">
                When students move out, perfectly good items get left behind — not because they're worthless, but because there's no easy way to pass them on. Until now.
              </p>
            </FadeItem>
            <FadeItem>
              <div className="photo-moment-stat">
                <span className="photo-moment-num">640M</span>
                <span className="photo-moment-unit">pounds discarded at U.S. campus move-outs every year</span>
              </div>
            </FadeItem>
          </AnimSection>
        </div>
      </section>

      {/* ══════ VERIFICATION / TRUST ══════ */}
      <section className="verify-section">
        <div className="section-wrap">
          <div className="verify-grid">
            {/* Left — copy */}
            <AnimSection className="verify-copy">
              <FadeItem>
                <span className="eyebrow">Security</span>
                <h2 className="h1" style={{ marginBottom: 16 }}>
                  Verification that<br />earns trust.
                </h2>
                <p className="body-lg" style={{ marginBottom: 32 }}>
                  Every account is locked to a valid .edu address. No exceptions, no workarounds. The marketplace stays student-only because access is verified, not assumed.
                </p>
              </FadeItem>
              <FadeItem>
                <ul className="verify-list">
                  {['University email required at signup', 'Verified badge on every listing', 'Campus-filtered — your school only', 'No public profiles or anonymous buyers'].map(item => (
                    <li key={item} className="verify-list-item">
                      <span className="verify-check">✓</span>{item}
                    </li>
                  ))}
                </ul>
              </FadeItem>
            </AnimSection>

            {/* Right — UI mockup */}
            <AnimSection className="verify-mockup-col">
              <FadeItem>
                <div className="verify-mockup">
                  <div className="verify-mockup-header">
                    <span className="verify-mockup-title">Verify your identity</span>
                    <span className="verify-mockup-sub">Enter your university email to get started</span>
                  </div>
                  <div className="verify-mockup-field">
                    <label className="verify-field-label">University email</label>
                    <div className="verify-field-input">
                      <span className="verify-field-val">yourname@harvard.edu</span>
                      <span className="verify-field-badge">✓ Verified</span>
                    </div>
                  </div>
                  <div className="verify-mockup-field">
                    <label className="verify-field-label">Institution</label>
                    <div className="verify-field-input verify-field-filled">
                      <span className="verify-field-val">Harvard University</span>
                    </div>
                  </div>
                  <div className="verify-mockup-field">
                    <label className="verify-field-label">Status</label>
                    <div className="verify-field-status">
                      <span className="verify-status-dot" />
                      <span style={{ color: 'var(--green-text)', fontWeight: 600, fontSize: '0.9rem' }}>Active student — marketplace access granted</span>
                    </div>
                  </div>
                  <div className="verify-mockup-btn">Get started →</div>
                </div>
              </FadeItem>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ══════ WASTE NUMBERS ══════ */}
      <section className="waste-section">
        <div className="waste-inner">
          <AnimSection className="waste-header">
            <FadeItem><span className="eyebrow">The numbers</span></FadeItem>
            <FadeItem><h2 className="waste-headline">What gets left behind.</h2></FadeItem>
            <FadeItem><p className="waste-sub">Student waste at U.S. universities. Most of it is perfectly usable. It just needs somewhere to go.</p></FadeItem>
          </AnimSection>
          <AnimSection>
            <motion.div className="waste-numbers"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}>
              {[{val:'640M',label:'pounds of student items discarded at move-out each year'},{val:'$350',label:'average value of items thrown away per graduating student'},{val:'85%',label:'of move-out waste that could be reused or donated instead'}].map(({val,label}) => (
                <motion.div key={val} className="waste-number-cell" variants={fadeUp}>
                  <div className="waste-num-val">{val}</div>
                  <div className="waste-num-label">{label}</div>
                </motion.div>
              ))}
            </motion.div>
          </AnimSection>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section className="cta-section">
        <div className="cta-inner">
          <AnimSection style={{ display: 'contents' }}>
            <FadeItem><h2 className="cta-headline">Keep it in<br />circulation.</h2></FadeItem>
            <FadeItem><p className="cta-sub">List what you no longer need. Find what you're looking for. Same campus, same community.</p></FadeItem>
            <FadeItem>
              <div className="btn-row" style={{ justifyContent: 'center' }}>
                <Link className="btn btn-lg" to="/listings">Browse listings</Link>
                <Link className="btn btn-lg btn-ghost" to={currentUser ? '/listings' : '/auth'}>
                  {currentUser ? 'Post an item' : 'Create account'}
                </Link>
              </div>
            </FadeItem>
          </AnimSection>
        </div>
      </section>

    </main>
  );
}
