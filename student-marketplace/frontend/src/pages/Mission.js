import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AnimSection, FadeItem, fadeUp } from '../components/Anim';

const VALUES = [
  {
    num: '01', icon: '🌱',
    title: 'Nonprofit by design.',
    body: "We take zero commissions — now or ever. Campus Cycle is not a business that happens to care about students. It's a student initiative that happens to look like a product.",
  },
  {
    num: '02', icon: '🔒',
    title: 'Trust over scale.',
    body: ".edu verification isn't a feature, it's the foundation. We grow one campus at a time, verified student by verified student, because a trusted small network beats an anonymous large one.",
  },
  {
    num: '03', icon: '📍',
    title: 'Local, always.',
    body: "No shipping labels, no strangers, no waiting. Every transaction happens between two people on the same campus. That's the whole model — and we're not changing it.",
  },
];

export default function Mission() {
  const photoBg = {
    backgroundImage: [
      'linear-gradient(105deg, rgba(17,29,18,0.90) 0%, rgba(17,29,18,0.68) 55%, rgba(17,29,18,0.45) 100%)',
      'url(https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1600&q=85&auto=format&fit=crop)',
    ].join(', '),
    backgroundSize: '100% 100%, cover',
    backgroundPosition: '0 0, center center',
    backgroundRepeat: 'no-repeat, no-repeat',
  };

  return (
    <main className="mv2-wrap">

      {/* ══ HERO ══ */}
      <section className="mv2-hero">
        <div className="mv2-hero-glow" aria-hidden="true" />
        <div className="section-wrap">
          <div className="mv2-hero-inner">

            <AnimSection className="mv2-hero-text">
              <FadeItem>
                <span className="mv2-pill">♻️ Nonprofit · zero commissions</span>
              </FadeItem>
              <FadeItem>
                <h1 className="mv2-h1">
                  The things you<br />leave behind<br />deserve a second<br />chapter.
                </h1>
              </FadeItem>
              <FadeItem>
                <p className="mv2-hero-sub">
                  Campus Cycle is a nonprofit student marketplace built for the moment
                  when move-out week turns perfectly good things into landfill.
                </p>
              </FadeItem>
              <FadeItem>
                <div className="btn-row">
                  <Link className="btn btn-lg btn-green" to="/listings">Browse listings</Link>
                  <Link className="btn btn-lg btn-outline" to="/auth">Join the pilot →</Link>
                </div>
              </FadeItem>
            </AnimSection>

            <AnimSection className="mv2-hero-panel" delay={0.08}>
              <FadeItem>
                <div className="mv2-stat-card">
                  <div className="mv2-stat-row">
                    <span className="mv2-stat-num">640M</span>
                    <span className="mv2-stat-label">
                      pounds of student items discarded at U.S. campus move-outs each year
                    </span>
                  </div>
                  <div className="mv2-stat-divider" />
                  <div className="mv2-stat-row">
                    <span className="mv2-stat-num">$350</span>
                    <span className="mv2-stat-label">
                      average value of items thrown away per graduating student
                    </span>
                  </div>
                  <div className="mv2-stat-divider" />
                  <div className="mv2-stat-row">
                    <span className="mv2-stat-num">85%</span>
                    <span className="mv2-stat-label">
                      of that waste is still perfectly usable — it just needs somewhere to go
                    </span>
                  </div>
                  <div className="mv2-stat-footer">
                    <span className="mv2-stat-badge">🌿 The case for Campus Cycle</span>
                  </div>
                </div>
              </FadeItem>
            </AnimSection>

          </div>
        </div>
      </section>

      {/* ══ THE PROBLEM ══ */}
      <section className="mv2-problem">
        <div className="section-wrap">
          <div className="mv2-split">

            <AnimSection className="mv2-split-text">
              <FadeItem>
                <span className="eyebrow">The problem</span>
                <h2 className="h1" style={{ marginBottom: 20 }}>
                  Move-out week.<br />Every year.
                </h2>
              </FadeItem>
              <FadeItem>
                <p className="body-lg" style={{ marginBottom: 16 }}>
                  Furniture. Appliances. Clothing. Textbooks. Things discarded not
                  because they're worthless — but because there was no easy way to find
                  them a new home before the truck came.
                </p>
                <p className="body-lg">
                  At universities across the country, the same scene plays out every May.
                  Dumpsters overflow with items that still have years of life in them.
                  Most of it never had to end up there.
                </p>
              </FadeItem>
            </AnimSection>

            <AnimSection className="mv2-split-visual" delay={0.08}>
              <FadeItem>
                <div className="mv2-quote-card">
                  <p className="mv2-quote-text">
                    "Every year, at universities across the country, move-out week ends
                    the same way: dumpsters overflowing with items that still have years
                    of life left."
                  </p>
                  <div className="mv2-quote-attr">
                    <span className="mv2-quote-leaf">🌿</span>
                    <span>Campus Cycle founding team</span>
                  </div>
                  <div className="mv2-quote-divider" />
                  <div className="mv2-mini-stats">
                    <div className="mv2-mini-stat">
                      <strong>3,000+</strong>
                      <span>students at a typical campus move-out</span>
                    </div>
                    <div className="mv2-mini-stat">
                      <strong>4 days</strong>
                      <span>average window to find a buyer or donate</span>
                    </div>
                  </div>
                </div>
              </FadeItem>
            </AnimSection>

          </div>
        </div>
      </section>

      {/* ══ PHOTO BREAK ══ */}
      <section className="mv2-photo" style={photoBg}>
        <div className="section-wrap">
          <div className="mv2-photo-body">
            <AnimSection>
              <FadeItem>
                <span className="mv2-photo-eyebrow">The scale of it</span>
              </FadeItem>
              <FadeItem>
                <h2 className="mv2-photo-headline">What gets left behind.</h2>
              </FadeItem>
              <FadeItem>
                <div className="mv2-photo-stats">
                  {[
                    { num: '640M', label: 'pounds discarded at U.S. campus move-outs annually' },
                    { num: '$350', label: 'average value thrown away per graduating student' },
                    { num: '85%',  label: 'of that waste is reusable — it just needs somewhere to go' },
                  ].map(({ num, label }) => (
                    <div key={num} className="mv2-photo-stat">
                      <span className="mv2-photo-num">{num}</span>
                      <span className="mv2-photo-label">{label}</span>
                    </div>
                  ))}
                </div>
              </FadeItem>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ══ OUR APPROACH ══ */}
      <section className="mv2-approach">
        <div className="section-wrap">
          <div className="mv2-split mv2-split-flip">

            <AnimSection className="mv2-split-visual" delay={0.08}>
              <FadeItem>
                <div className="mv2-approach-card">
                  <span className="mv2-approach-icon">♻️</span>
                  <h3 className="mv2-approach-title">How it works</h3>
                  <ul className="mv2-approach-list">
                    {[
                      'Verified .edu email required',
                      '0% commission — forever',
                      'Campus pickup only — no shipping',
                      'Student-to-student, direct',
                      'List in under a minute',
                    ].map(item => (
                      <li key={item}>
                        <span className="mv2-approach-check">✓</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeItem>
            </AnimSection>

            <AnimSection className="mv2-split-text">
              <FadeItem>
                <span className="eyebrow">Our approach</span>
                <h2 className="h1" style={{ marginBottom: 20 }}>
                  Easier to pass on<br />than throw away.
                </h2>
              </FadeItem>
              <FadeItem>
                <p className="body-lg" style={{ marginBottom: 16 }}>
                  Campus Cycle exists to keep things in circulation. We're a nonprofit
                  student marketplace. We take zero commissions and always will.
                </p>
                <p className="body-lg" style={{ marginBottom: 32 }}>
                  What students discard at move-out isn't waste. It's inventory for next
                  year's incoming class — the mini fridge someone needs, the lamp they
                  were about to buy new, the textbook that costs $200 retail and $20
                  between classmates.
                </p>
              </FadeItem>
              <FadeItem>
                <Link className="btn btn-lg btn-green" to="/listings">Browse listings →</Link>
              </FadeItem>
            </AnimSection>

          </div>
        </div>
      </section>

      {/* ══ VALUES ══ */}
      <section className="mv2-values">
        <div className="section-wrap">
          <AnimSection>
            <FadeItem className="mv2-values-header">
              <span className="eyebrow">What we stand for</span>
              <h2 className="h1" style={{ marginBottom: 8 }}>
                Three things we'll<br />never compromise on.
              </h2>
            </FadeItem>
            <motion.div className="mv2-values-grid"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}>
              {VALUES.map(({ num, icon, title, body }) => (
                <motion.div key={num} className="mv2-value-card" variants={fadeUp}>
                  <span className="mv2-value-icon">{icon}</span>
                  <div className="mv2-value-num">{num}</div>
                  <h3 className="mv2-value-title">{title}</h3>
                  <p className="mv2-value-body">{body}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimSection>
        </div>
      </section>

      {/* ══ FOUNDING ══ */}
      <section className="mv2-founding">
        <div className="section-wrap">
          <div className="mv2-split">

            <AnimSection className="mv2-split-text">
              <FadeItem>
                <span className="eyebrow">Where it started</span>
                <h2 className="h1" style={{ marginBottom: 20 }}>
                  Started at Harvard.<br />Built for every<br />campus.
                </h2>
              </FadeItem>
              <FadeItem>
                <p className="body-lg" style={{ marginBottom: 16 }}>
                  Campus Cycle launched as a pilot at Harvard University — one campus,
                  one community, one move-out season at a time.
                </p>
                <p className="body-lg" style={{ marginBottom: 32 }}>
                  The infrastructure we're building here is designed to work anywhere:
                  any school, any city, any student who has something worth passing on.
                  Expansion is driven by the students who ask for it.
                </p>
              </FadeItem>
              <FadeItem>
                <div className="btn-row">
                  <Link className="btn btn-lg btn-green" to="/auth">Join the pilot</Link>
                  <Link className="btn btn-lg btn-outline" to="/listings">Browse listings</Link>
                </div>
              </FadeItem>
            </AnimSection>

            <AnimSection className="mv2-split-visual" delay={0.08}>
              <FadeItem>
                <div className="mv2-founding-card">
                  <div className="mv2-founding-school">
                    <span className="mv2-founding-flag">🏛️</span>
                    <div>
                      <strong>Harvard University</strong>
                      <span>Cambridge, MA · Pilot campus</span>
                    </div>
                  </div>
                  <div className="mv2-founding-divider" />
                  <p className="mv2-founding-note">
                    If you're a student at another university and want Campus Cycle at
                    your school, reach out. We expand one campus at a time.
                  </p>
                  <a className="btn btn-sm btn-ghost mv2-founding-contact" href="mailto:hello@campuscycle.org">
                    Get in touch →
                  </a>
                  <div className="mv2-founding-badges">
                    <span className="mv2-founding-badge">🌿 Nonprofit</span>
                    <span className="mv2-founding-badge">0% Commission</span>
                    <span className="mv2-founding-badge">.edu Verified</span>
                  </div>
                </div>
              </FadeItem>
            </AnimSection>

          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="mv2-cta">
        <div className="section-wrap">
          <AnimSection className="mv2-cta-inner">
            <FadeItem>
              <span className="mv2-cta-leaf" aria-hidden="true">🌿</span>
            </FadeItem>
            <FadeItem>
              <h2 className="mv2-cta-headline">Ready to pass it on?</h2>
            </FadeItem>
            <FadeItem>
              <p className="mv2-cta-sub">
                Join the pilot. List what you no longer need. Find what you're looking
                for. Same campus, same community, zero waste.
              </p>
            </FadeItem>
            <FadeItem>
              <div className="btn-row" style={{ justifyContent: 'center' }}>
                <Link className="btn btn-lg mv2-cta-btn" to="/listings">Browse listings</Link>
                <Link className="btn btn-lg mv2-cta-ghost" to="/auth">Create account →</Link>
              </div>
            </FadeItem>
          </AnimSection>
        </div>
      </section>

    </main>
  );
}
