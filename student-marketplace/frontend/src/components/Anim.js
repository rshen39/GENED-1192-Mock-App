import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../utils/useInView';

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
};

export function AnimSection({ children, className, style, delay = 0.1 }) {
  const [ref, inView] = useInView();
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={{ hidden: {}, show: { transition: { staggerChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

export function FadeItem({ children, className, style }) {
  return (
    <motion.div className={className} style={style} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
