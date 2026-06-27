'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface BlurTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p';
}

export const BlurText: React.FC<BlurTextProps> = ({ text, className, as: Tag = 'p' }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, []);

  const words = text.split(' ');

  return (
    <div ref={wrapperRef}>
      <Tag
        className={className}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          rowGap: '0.15em',
        }}
      >
        {words.map((word, i) => {
          const delay = (i * 100) / 1000;
          return (
            <motion.span
              key={i}
              initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
              animate={
                isInView
                  ? {
                      filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
                      opacity: [0, 0.5, 1],
                      y: [50, -5, 0],
                    }
                  : {}
              }
              transition={{
                duration: 0.7,
                times: [0, 0.5, 1],
                ease: 'easeOut',
                delay: delay,
              }}
              style={{
                display: 'inline-block',
                marginRight: '0.28em',
              }}
            >
              {word}
            </motion.span>
          );
        })}
      </Tag>
    </div>
  );
};
