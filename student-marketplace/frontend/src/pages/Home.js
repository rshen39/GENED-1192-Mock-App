import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from '../utils/useInView';

/* ── Animation helpers ──────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

function AnimSection({ children, className, style, delay = 0.08 }) {
  const ctrl = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => { if (inView) ctrl.start('show'); }, [inView, ctrl]);
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={ctrl}
      variants={{ hidden: {}, show: { transition: { staggerChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

function FadeItem({ children, className, style }) {
  return (
    <motion.div className={className} style={style} variants={fadeUp}>
      {children}
    </motion.div>
  );
}

/* ── Marquee ────────────────────────────────────────────── */
const MARQUEE_ITEMS = [
  'Harvard Pilot', '.edu Verified', 'Zero Commissions', 'Free to Use',
  'Nonprofit', 'Campus Meetup Only', 'Pass It On', 'Move-Out Ready',
];

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
            <span className="marquee-sep" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Domain list (inside bento card) ───────────────────── */
const DOMAINS = ['harvard.edu', 'mit.edu', 'yale.edu', 'columbia.edu', 'stanford.edu'];

function DomainList() {
  return (
    <div className="bento-domain-list">
      {DOMAINS.map(d => (
        <div key={d} className="bento-domain-row">
          <span>{d}</span>
          <span className="bento-domain-check">✓ verified</span>
        </div>
      ))}
    </div>
  );
}

/* ── Main page ──────────────────────────────────────────── */
export default function Home({ currentUser }) {
  const heroCtrl = useAnimation();
  const [heroRef, heroInView] = useInView();

  useEffect(() => { if (heroInView) heroCtrl.start('show'); }, [heroInView, heroCtrl]);

  return (
    <main className="home-wrap">

      {/* ══════════════ HERO ══════════════ */}
      <section className="hero" ref={heroRef}>
        {/* Aurora orbs */}
        <div className="hero-aurora" aria-hidden="true">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
          <div className="hero-orb hero-orb-4" />
        </div>

        <div className="hero-content">
          <motion.div
            className="hero-label"
            initial={{ opacity: 0, y: 14 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hero-dot" />
            Harvard pilot · .edu only
          </motion.div>

          <motion.h1
            className="hero-headline"
            initial={{ opacity: 0, y: 44 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          >
            Pass it on.
          </motion.h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 28 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          >
            The student-only campus marketplace for buying and reselling
            dorm essentials, appliances, and gear — before they become waste.
          </motion.p>

          <motion.div
            className="btn-row hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.26 }}
          >
            <Link className="btn btn-lg" to="/listings">Browse listings</Link>
            <Link className="btn btn-lg btn-ghost" to={currentUser ? '/listings' : '/auth'}>
              {currentUser ? 'Post an item' : 'Start selling'}
            </Link>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.36 }}
          >
            {[
              { val: 'Harvard', label: 'Pilot campus' },
              { val: '0%',      label: 'Commission taken' },
              { val: '.edu',    label: 'Verified only' },
              { val: 'Free',    label: 'Always' },
            ].map(({ val, label }) => (
              <div className="hero-stat" key={label}>
                <strong className="hero-stat-val">{val}</strong>
                <span className="hero-stat-label">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════ MARQUEE ══════════════ */}
      <Marquee />

      {/* ══════════════ BENTO GRID ══════════════ */}
      <section className="bento-section">
        <div className="section-wrap">
          <AnimSection className="bento-header">
            <FadeItem>
              <span className="eyebrow">Why it works</span>
              <h2 className="h1" style={{ marginBottom: 14 }}>
                Built for the way<br />campus actually works.
              </h2>
              <p className="body-lg" style={{ margin: '0 auto' }}>
                No strangers, no shipping, no fees. A marketplace designed
                around the specific rhythm of student life.
              </p>
            </FadeItem>
          </AnimSection>

          <AnimSection>
            <motion.div
              className="bento-grid"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
            >

              {/* A — .edu verified (large) */}
              <motion.div className="bento-cell bento-a" variants={fadeUp}>
                <div className="bento-cell-inner">
                  <div className="bento-eyebrow">Access</div>
                  <div className="bento-title">.edu only.<br />No exceptions.</div>
                  <p className="bento-body">
                    Every account is tied to a verified university email. Not
                    enrolled, not in. The marketplace stays trusted by design.
                  </p>
                  <DomainList />
                </div>
              </motion.div>

              {/* B — 0% commission (small) */}
              <motion.div className="bento-cell bento-b" variants={fadeUp}>
                <div className="bento-cell-inner" style={{ justifyContent: 'space-between' }}>
                  <div>
                    <div className="bento-eyebrow">Pricing</div>
                    <div className="bento-title">You keep everything.</div>
                  </div>
                  <div className="bento-stat-num">0%</div>
                  <p className="bento-stat-desc">
                    Commission taken. Every dollar goes directly to the seller.
                  </p>
                </div>
              </motion.div>

              {/* C — campus meetup (small) */}
              <motion.div className="bento-cell bento-c" variants={fadeUp}>
                <div className="bento-cell-inner" style={{ justifyContent: 'space-between' }}>
                  <div>
                    <div className="bento-eyebrow">Logistics</div>
                    <div className="bento-title">Hand to hand. Same campus.</div>
                  </div>
                  <p className="bento-body" style={{ marginBottom: 0 }}>
                    No shipping labels. No waiting. Meet nearby, exchange in minutes.
                    The way it should work.
                  </p>
                </div>
              </motion.div>

              {/* D — impact stat (large) */}
              <motion.div className="bento-cell bento-d" variants={fadeUp}>
                <div
                  className="bento-cell-inner"
                  style={{
                    backgroundImage: 'radial-gradient(ellipse at bottom right, rgba(34,197,94,0.06), transparent 60%)',
                  }}
                >
                  <div className="bento-eyebrow">Impact</div>
                  <div className="bento-stat-num" style={{ fontSize: 'clamp(4rem, 8vw, 7.5rem)' }}>
                    640M
                  </div>
                  <div className="bento-title" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', marginTop: 12 }}>
                    pounds discarded.<br />Every move-out.
                  </div>
                  <p className="bento-body">
                    Student waste at U.S. universities. Most of it is perfectly usable.
                    It just needs somewhere to go.
                  </p>
                </div>
              </motion.div>

            </motion.div>
          </AnimSection>
        </div>
      </section>

      {/* ══════════════ HOW IT WORKS ══════════════ */}
      <section className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="section-wrap">
          <AnimSection>
            <FadeItem className="section-header">
              <span className="eyebrow">Process</span>
              <h2 className="h1" style={{ marginBottom: 14 }}>From listing to handoff,<br />in minutes.</h2>
              <p className="body-lg" style={{ margin: '0 auto' }}>
                Built for the sprint of move-out season. Three steps, zero friction.
              </p>
            </FadeItem>

            <motion.div
              className="steps"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            >
              {[
                {
                  n: '01',
                  title: 'Verify your .edu',
                  body: 'Create an account with your university email. Verification keeps the marketplace student-only and trusted.',
                },
                {
                  n: '02',
                  title: 'List or browse',
                  body: 'Post an item in under two minutes, or search listings from students at your school filtered by category.',
                },
                {
                  n: '03',
                  title: 'Meet on campus',
                  body: 'Agree on a spot, exchange in person. No shipping, no fees. The item moves from one student to the next.',
                },
              ].map(({ n, title, body }) => (
                <motion.div key={n} className="step" variants={fadeUp}>
                  <div className="step-num">{n}</div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimSection>
        </div>
      </section>

      {/* ══════════════ WASTE / IMPACT ══════════════ */}
      <section className="waste-section">
        <div className="waste-inner">
          <AnimSection className="waste-header">
            <FadeItem>
              <span className="eyebrow">Every May</span>
            </FadeItem>
            <FadeItem>
              <h2 className="waste-headline">What gets left<br />behind.</h2>
            </FadeItem>
            <FadeItem>
              <p className="waste-sub">
                When students move out, perfectly good items end up in dumpsters.
                Not because they're worthless — because there's no easy way to pass them on.
              </p>
            </FadeItem>
          </AnimSection>

          <AnimSection>
            <motion.div
              className="waste-numbers"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            >
              {[
                { val: '640M',  label: 'pounds of student items discarded at move-out each year across U.S. universities' },
                { val: '$350',  label: 'average value of items thrown away per graduating student' },
                { val: '85%',   label: 'of move-out waste that could be reused or donated instead' },
              ].map(({ val, label }) => (
                <motion.div key={val} className="waste-number-cell" variants={fadeUp}>
                  <div className="waste-num-val">{val}</div>
                  <div className="waste-num-label">{label}</div>
                </motion.div>
              ))}
            </motion.div>

            <FadeItem>
              <p className="waste-quote">
                "It doesn't have to end up in a landfill.<br />
                It just needs somewhere to go."
              </p>
            </FadeItem>
          </AnimSection>
        </div>
      </section>

      {/* ══════════════ CTA ══════════════ */}
      <section className="cta-section">
        <div className="cta-inner">
          <AnimSection style={{ display: 'contents' }}>
            <FadeItem>
              <h2 className="cta-headline">Keep it in<br />circulation.</h2>
            </FadeItem>
            <FadeItem>
              <p className="cta-sub">
                List what you no longer need. Find what you're looking for.
                Same campus, same community.
              </p>
            </FadeItem>
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
