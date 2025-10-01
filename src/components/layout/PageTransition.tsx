import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export const PageTransitionCurtain = ({ children }: PageTransitionProps) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={location.pathname} className="relative">
        {/* Page content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {children}
        </motion.div>

        {/* Curtain overlay - slides in from right, then out to left */}
        <motion.div
          className="fixed inset-0 z-[100] bg-dental-blue"
          initial={{ x: '100%' }}
          animate={{ x: '100%' }}
          exit={{ x: 0 }}
          transition={{ 
            duration: 0.5, 
            ease: [0.77, 0, 0.18, 1] // Custom cubic-bezier for smooth motion
          }}
          onAnimationComplete={(definition: any) => {
            // When exit animation completes, slide out to reveal new page
            if (definition.x === 0) {
              // This is handled by the next page's entry
            }
          }}
        />
        
        {/* Second phase - curtain slides out to left */}
        <motion.div
          className="fixed inset-0 z-[100] bg-dental-blue pointer-events-none"
          initial={{ x: 0 }}
          animate={{ x: '-100%' }}
          transition={{ 
            duration: 0.5,
            delay: 0.2, 
            ease: [0.77, 0, 0.18, 1]
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};
