import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../utils/useInView';

const EASE = [0.22, 1, 0.36, 1];

// Thin layout wrapper — no animation logic, children animate themselves
export function AnimSection({ children, className, style }) {
  return <div className={className} style={style}>{children}</div>;
}

// Self-contained fade-up: each item observes its own visibility
export function FadeItem({ children, className, style, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

// Still exported for any direct motion.div usage
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
