import { motion } from 'framer-motion';
import { ReactNode } from 'react';
interface VoiceFlowLayoutProps {
  children: ReactNode;
  centralElement: ReactNode;
  className?: string;
}
export const VoiceFlowLayout = ({
  children,
  centralElement,
  className = ''
}: VoiceFlowLayoutProps) => {
  return <div className={`relative ${className}`}>
      {/* Central Element */}
      

      {/* Cards positioned around center */}
      <div className="relative">
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{
        zIndex: 1
      }}>
          {/* Top Left */}
          <motion.path d="M 50% 0 Q 25% 25% 12.5% 50%" stroke="hsl(var(--dental-blue))" strokeWidth="2" fill="none" strokeDasharray="4 4" initial={{
          pathLength: 0,
          opacity: 0
        }} animate={{
          pathLength: [0, 1, 0],
          opacity: [0, 0.6, 0]
        }} transition={{
          duration: 3,
          repeat: Infinity,
          delay: 0,
          ease: "easeInOut"
        }} />
          
          {/* Top Right */}
          <motion.path d="M 50% 0 Q 75% 25% 87.5% 50%" stroke="hsl(var(--dental-lavender))" strokeWidth="2" fill="none" strokeDasharray="4 4" initial={{
          pathLength: 0,
          opacity: 0
        }} animate={{
          pathLength: [0, 1, 0],
          opacity: [0, 0.6, 0]
        }} transition={{
          duration: 3,
          repeat: Infinity,
          delay: 0.75,
          ease: "easeInOut"
        }} />
          
          {/* Bottom Left */}
          <motion.path d="M 50% 0 Q 25% 75% 12.5% 100%" stroke="hsl(var(--dental-blue))" strokeWidth="2" fill="none" strokeDasharray="4 4" initial={{
          pathLength: 0,
          opacity: 0
        }} animate={{
          pathLength: [0, 1, 0],
          opacity: [0, 0.6, 0]
        }} transition={{
          duration: 3,
          repeat: Infinity,
          delay: 1.5,
          ease: "easeInOut"
        }} />
          
          {/* Bottom Right */}
          <motion.path d="M 50% 0 Q 75% 75% 87.5% 100%" stroke="hsl(var(--dental-lavender))" strokeWidth="2" fill="none" strokeDasharray="4 4" initial={{
          pathLength: 0,
          opacity: 0
        }} animate={{
          pathLength: [0, 1, 0],
          opacity: [0, 0.6, 0]
        }} transition={{
          duration: 3,
          repeat: Infinity,
          delay: 2.25,
          ease: "easeInOut"
        }} />
        </svg>

        {/* Cards Grid */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>;
};
interface VoiceActiveCardProps {
  children: ReactNode;
  index: number;
  className?: string;
}
export const VoiceActiveCard = ({
  children,
  index,
  className = ''
}: VoiceActiveCardProps) => {
  return <motion.div className={className} animate={{
    scale: [1, 1.05, 1],
    boxShadow: ['0 4px 6px -1px rgba(0, 0, 0, 0.1)', '0 10px 15px -3px hsl(var(--dental-blue) / 0.2)', '0 4px 6px -1px rgba(0, 0, 0, 0.1)']
  }} transition={{
    duration: 3,
    repeat: Infinity,
    delay: index * 0.75,
    ease: "easeInOut"
  }}>
      {children}
      
      {/* Voice indicator dots */}
      <div className="absolute -top-2 -right-2">
        <motion.div className="w-3 h-3 rounded-full bg-dental-blue" animate={{
        opacity: [0, 1, 0],
        scale: [0.8, 1.2, 0.8]
      }} transition={{
        duration: 3,
        repeat: Infinity,
        delay: index * 0.75,
        ease: "easeInOut"
      }} />
      </div>
    </motion.div>;
};