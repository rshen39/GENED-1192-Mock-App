import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from '../utils/useInView';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function AnimSection({ children, className, style, delay = 0.1 }) {
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

const VALUES = [
  {
    label: '01',
    title: 'Nonprofit by design.',
    body: 'We take zero commissions — now or ever. Campus Cycle is not a business that happens to care about students. It\'s a student initiative that happens to look like a product.',
  },
  {
    label: '02',
    title: 'Trust over scale.',
    body: '.edu verification isn\'t a feature, it\'s the foundation. We grow one campus at a time, verified student by verified student, because a trusted small network beats an anonymous large one.',
  },
  {
    label: '03',
    title: 'Local, always.',
    body: 'No shipping labels, no strangers, no waiting. Every transaction happens between two people on the same campus. That\'s the whole model — and we\'re not changing it.',
  },
];

export default function Mission() {
  return (
    <main className="mission-wrap">

      {/* ══════════════ HERO ══════════════ */}
      <section className="mission-hero">
        <div className="hero-aurora" aria-hidden="true">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-3" />
        </div>
        <div className="mission-hero-content">
          <AnimSection>
            <FadeItem>
              <span className="mission-eyebrow">Our mission</span>
            </FadeItem>
            <FadeItem>
              <h1 className="mission-headline">
                We're done watching<br />good things get<br />thrown away.
              </h1>
            </FadeItem>
            <FadeItem>
              <p className="mission-hero-sub">
                Campus Cycle is a nonprofit student marketplace built for the moment
                when move-out week turns perfectly good things into landfill.
              </p>
            </FadeItem>
          </AnimSection>
        </div>
      </section>

      {/* ══════════════ STATEMENT ══════════════ */}
      <section className="mission-statement-section">
        <div className="mission-statement-inner">
          <AnimSection>
            <FadeItem>
              <p className="mission-statement-pull">
                "Every year, at universities across the country, move-out week ends the
                same way: dumpsters overflowing with items that still have years of life left."
              </p>
            </FadeItem>
          </AnimSection>

          <AnimSection delay={0.12}>
            <FadeItem>
              <p className="mission-body-graf">
                Furniture. Appliances. Clothing. Textbooks. Things discarded not because
                they're worthless — but because there was no easy way to find them a new home
                before the truck came.
              </p>
            </FadeItem>
            <FadeItem>
              <p className="mission-body-graf">
                Campus Cycle is built for that moment. We're a nonprofit student marketplace
                that exists to keep things in circulation. We take zero commissions and always
                will. We grow one campus at a time, verified student by verified student.
                Our only goal is to make it easier to pass something on than to throw it away.
              </p>
            </FadeItem>
            <FadeItem>
              <p className="mission-body-graf">
                What students discard at move-out isn't waste. It's inventory for next year's
                incoming class — the mini fridge someone needs, the lamp they were about to
                buy new, the textbook that costs $200 retail and $20 between classmates.
                We're building the infrastructure that connects those two students.
              </p>
            </FadeItem>
          </AnimSection>
        </div>
      </section>

      {/* ══════════════ WASTE PHOTO SECTION ══════════════ */}
      <section className="mission-photo-section">
        <div
          className="mission-photo-bg"
          style={{
            backgroundImage: [
              'linear-gradient(180deg, rgba(6,6,8,0.55) 0%, rgba(6,6,8,0.40) 40%, rgba(6,6,8,0.80) 100%)',
              'url(https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1600&q=85&auto=format&fit=crop)',
            ].join(', '),
          }}
        />
        <div className="mission-photo-content">
          <AnimSection>
            <FadeItem>
              <span className="mission-photo-eyebrow">The scale of it</span>
            </FadeItem>
            <FadeItem>
              <div className="mission-photo-stats">
                <div className="mission-photo-stat">
                  <span className="mission-photo-num">640M</span>
                  <span className="mission-photo-label">pounds of student items discarded at U.S. campus move-outs annually</span>
                </div>
                <div className="mission-photo-stat">
                  <span className="mission-photo-num">$350</span>
                  <span className="mission-photo-label">average value of items thrown away per graduating student</span>
                </div>
                <div className="mission-photo-stat">
                  <span className="mission-photo-num">85%</span>
                  <span className="mission-photo-label">of that waste is reusable — it just needs somewhere to go</span>
                </div>
              </div>
            </FadeItem>
          </AnimSection>
        </div>
      </section>

      {/* ══════════════ VALUES ══════════════ */}
      <section className="mission-values-section">
        <div className="section-wrap">
          <AnimSection>
            <FadeItem className="mission-values-header">
              <span className="eyebrow">What we stand for</span>
              <h2 className="h1" style={{ marginBottom: 14 }}>
                Three things we'll<br />never compromise on.
              </h2>
            </FadeItem>

            <motion.div
              className="mission-values-grid"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            >
              {VALUES.map(({ label, title, body }) => (
                <motion.div key={label} className="mission-value-card" variants={fadeUp}>
                  <div className="mission-value-num">{label}</div>
                  <h3 className="mission-value-title">{title}</h3>
                  <p className="mission-value-body">{body}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimSection>
        </div>
      </section>

      {/* ══════════════ FOUNDING ══════════════ */}
      <section className="mission-founding-section">
        <div className="section-wrap">
          <AnimSection className="mission-founding-inner">
            <FadeItem>
              <span className="eyebrow">Where it started</span>
            </FadeItem>
            <FadeItem>
              <h2 className="mission-founding-headline">
                Started at Harvard.<br />Built for every campus.
              </h2>
            </FadeItem>
            <FadeItem>
              <p className="mission-founding-body">
                Campus Cycle launched as a pilot at Harvard University — one campus,
                one community, one move-out season at a time. The infrastructure we're
                building here is designed to work anywhere: any school, any city, any
                student who has something worth passing on.
              </p>
            </FadeItem>
            <FadeItem>
              <p className="mission-founding-body">
                If you're a student at another university and want Campus Cycle at your school,
                reach out. Expansion is driven by the students who ask for it.
              </p>
            </FadeItem>
            <FadeItem>
              <div className="btn-row" style={{ marginTop: 36 }}>
                <Link className="btn" to="/auth">Join the pilot</Link>
                <Link className="btn btn-ghost" to="/listings">Browse listings</Link>
              </div>
            </FadeItem>
          </AnimSection>
        </div>
      </section>

    </main>
  );
}
