import { useState, useRef, useEffect } from 'react';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
}

export const AnimatedCounter = ({ value, suffix = '', prefix = '' }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const increment = value / 50;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 40);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="font-bold">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};