import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from '../utils/useInView';

const CATEGORIES = [
  {
    icon: '🔌', name: 'Appliances', desc: 'Mini fridges, microwaves, fans',
    img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80&auto=format&fit=crop',
  },
  {
    icon: '🛋️', name: 'Furniture', desc: 'Desks, chairs, shelving',
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80&auto=format&fit=crop',
  },
  {
    icon: '👕', name: 'Clothing', desc: 'All sizes, all seasons',
    img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80&auto=format&fit=crop',
  },
  {
    icon: '📚', name: 'Books', desc: 'Textbooks, course materials',
    img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80&auto=format&fit=crop',
  },
  {
    icon: '🖥️', name: 'Electronics', desc: 'Monitors, keyboards, cables',
    img: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80&auto=format&fit=crop',
  },
  {
    icon: '🏠', name: 'Dorm Goods', desc: 'Bedding, organizers, storage',
    img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80&auto=format&fit=crop',
  },
  {
    icon: '🚲', name: 'Bikes', desc: 'Bikes, locks, gear',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80&auto=format&fit=crop',
  },
  {
    icon: '🍳', name: 'Kitchen', desc: 'Cookware, utensils, pantry',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80&auto=format&fit=crop',
  },
];

const HERO_PHOTOS = [
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=700&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=700&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=700&q=85&auto=format&fit=crop',
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

function AnimatedSection({ children, className, style, staggerDelay = 0.1 }) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) controls.start('show');
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={controls}
      variants={{ hidden: {}, show: { transition: { staggerChildren: staggerDelay } } }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedItem({ children, className, style, delay = 0 }) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

function Home({ currentUser }) {
  const heroControls = useAnimation();
  const [heroRef, heroInView] = useInView();

  useEffect(() => {
    if (heroInView) heroControls.start('show');
  }, [heroInView, heroControls]);

  return (
    <main className="home-wrap">

      {/* ════════════ HERO ════════════ */}
      <section className="hero" ref={heroRef}>
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />

        <motion.div
          className="hero-label"
          initial={{ opacity: 0, y: 16 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hero-dot" />
          Student-only · .edu verified · Free
        </motion.div>

        <motion.h1
          className="hero-headline"
          initial={{ opacity: 0, y: 40 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          Pass it on.
        </motion.h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 32 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          Campus Cycle is the student marketplace for buying and reselling
          dorm essentials, appliances, and gear — before they become waste.
        </motion.p>

        <motion.div
          className="btn-row hero-actions"
          initial={{ opacity: 0, y: 24 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          <Link className="btn btn-lg" to="/listings">Browse listings</Link>
          <Link className="btn btn-lg btn-ghost" to={currentUser ? '/listings' : '/auth'}>
            {currentUser ? 'Post an item' : 'Start selling'}
          </Link>
        </motion.div>

        <motion.div
          className="hero-proof"
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.42 }}
        >
          {[
            { num: 'Harvard', label: 'First campus' },
            { num: 'Free', label: 'Always' },
            { num: '.edu', label: 'Verified only' },
            { num: 'Nonprofit', label: 'No commissions' },
          ].map(({ num, label }) => (
            <div className="hero-proof-item" key={label}>
              <strong className="hero-proof-num">{num}</strong>
              <span className="hero-proof-label">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Photo collage */}
        <motion.div
          className="hero-photos"
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        >
          {HERO_PHOTOS.map((src, i) => (
            <motion.div
              key={src}
              className="hero-photo"
              style={{ backgroundImage: `url(${src})` }}
              initial={{ opacity: 0, y: 20 + i * 8 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.55 + i * 0.12 }}
            />
          ))}
        </motion.div>
      </section>

      {/* ════════════ HOW IT WORKS ════════════ */}
      <section className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="section-wrap">
          <AnimatedSection>
            <AnimatedItem className="section-header">
              <span className="eyebrow">How it works</span>
              <h2 className="h1" style={{ marginBottom: 12 }}>Three steps.</h2>
              <p className="body-lg" style={{ margin: '0 auto' }}>
                Built for the sprint of move-out season. Fast, local, zero friction.
              </p>
            </AnimatedItem>

            <motion.div
              className="steps"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            >
              {[
                { n: 1, title: 'Create your account', body: 'Sign up with your .edu email. Verification keeps the marketplace student-only and trusted.' },
                { n: 2, title: 'List or browse', body: 'Post an item in minutes or search listings from students at your school, filtered by category and area.' },
                { n: 3, title: 'Hand off on campus', body: 'Meet nearby. No shipping, no fees. The item moves from one student to the next.' },
              ].map(({ n, title, body }) => (
                <motion.div key={n} className="step" variants={fadeUp}>
                  <div className="step-num">{n}</div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ════════════ CATEGORIES ════════════ */}
      <section className="section categories-section">
        <div className="section-wrap">
          <AnimatedSection staggerDelay={0.07}>
            <AnimatedItem className="section-header" style={{ marginBottom: 48 }}>
              <span className="eyebrow">What's available</span>
              <h2 className="h1" style={{ marginBottom: 10 }}>Every category covered.</h2>
              <p className="body-lg" style={{ margin: '0 auto' }}>
                From mini-fridges to bikes — if a student owns it, it belongs here.
              </p>
            </AnimatedItem>

            <motion.div
              className="categories-grid"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
            >
              {CATEGORIES.map((cat) => (
                <motion.div key={cat.name} variants={fadeUp}>
                  <Link
                    to={`/listings?category=${cat.name}`}
                    className="category-card category-card-photo"
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      className="category-card-img"
                      style={{ backgroundImage: `url(${cat.img})` }}
                    />
                    <div className="category-card-body">
                      <span className="category-icon">{cat.icon}</span>
                      <h3>{cat.name}</h3>
                      <p>{cat.desc}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ════════════ WASTE / PAUSE SECTION ════════════ */}
      <section className="waste-section">
        <div className="waste-inner">
          <AnimatedSection className="waste-copy">
            <AnimatedItem>
              <span className="eyebrow">Every May</span>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="waste-headline">
                Most of it gets<br />thrown away.
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="waste-sub">
                When students move out, perfectly good items end up in dumpsters.
                Not because they're worthless — because there's no easy way to pass them on.
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <blockquote className="waste-statement">
                "It doesn't have to end up in a landfill.<br />
                It just needs somewhere to go."
              </blockquote>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedSection className="waste-nums">
            {[
              { val: '640M', desc: 'pounds of student waste generated at move-out each year in the U.S.' },
              { val: '$350', desc: 'average value of items discarded per graduating student' },
              { val: '85%', desc: 'of move-out waste that could be reused or donated instead' },
            ].map(({ val, desc }) => (
              <AnimatedItem key={val}>
                <div className="waste-num-row">
                  <span className="waste-num-val">{val}</span>
                  <span className="waste-num-desc">{desc}</span>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ════════════ TRUST ════════════ */}
      <section className="section trust-section">
        <div className="section-wrap">
          <AnimatedSection>
            <AnimatedItem className="section-header">
              <span className="eyebrow">Built for trust</span>
              <h2 className="h1" style={{ marginBottom: 10 }}>Student-only. By design.</h2>
              <p className="body-lg" style={{ margin: '0 auto' }}>
                No strangers. No public listings. Just your campus community.
              </p>
            </AnimatedItem>

            <motion.div
              className="trust-grid"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            >
              {[
                { icon: '✉️', title: '.edu verification', body: "Every account is tied to a valid university email. If you're not a student, you can't list or buy." },
                { icon: '📍', title: 'Campus-local only', body: "Listings are filtered to your school and region. You're always buying from someone nearby." },
                { icon: '♻️', title: 'Nonprofit, no commissions', body: "Campus Cycle takes nothing. Every dollar of your sale goes directly to you." },
              ].map(({ icon, title, body }) => (
                <motion.div key={title} className="trust-card" variants={fadeUp}>
                  <div className="trust-icon">{icon}</div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ════════════ FINAL CTA ════════════ */}
      <section className="cta-section">
        <div className="cta-inner">
          <AnimatedSection style={{ display: 'contents' }}>
            <AnimatedItem>
              <h2 className="cta-headline">Keep it in circulation.</h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="cta-sub">
                List what you no longer need. Find what you're looking for.
                Same campus, same community.
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <div className="btn-row" style={{ justifyContent: 'center' }}>
                <Link className="btn btn-lg" to="/listings">Browse listings</Link>
                <Link className="btn btn-lg btn-ghost" to={currentUser ? '/listings' : '/auth'}>
                  {currentUser ? 'Post an item' : 'Create account'}
                </Link>
              </div>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>

    </main>
  );
}

export default Home;
