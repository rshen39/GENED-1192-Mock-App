import { useState, useEffect, useRef } from 'react';

export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (options.once !== false) obs.disconnect();
      }
    }, { threshold: 0.1, rootMargin: options.margin || '-60px', ...options });

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, inView];
}
