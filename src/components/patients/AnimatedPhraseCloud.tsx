import { motion } from 'framer-motion';

export const AnimatedPhraseCloud = () => {
  const phrases = [
    // Main stats
    { text: "1,200+ Verified providers nationwide", size: "text-4xl", speed: 30 },
    { text: "4.8/5 Average provider rating", size: "text-3xl", speed: 25 },
    { text: "All Specialties covered", size: "text-5xl", speed: 35 },
    { text: "Same-Day Treatment starts available", size: "text-2xl", speed: 28 },
    { text: "Instant Pre-Approval", size: "text-4xl", speed: 29 },
    { text: "Flexible Payments", size: "text-3xl", speed: 27 },
    { text: "24/7 Support", size: "text-2xl", speed: 31 },
    { text: "Credit Building Opportunity", size: "text-3xl", speed: 23 },
    
    // Supporting phrases for visual richness
    { text: "Pre-screened dental professionals", size: "text-xl", speed: 20 },
    { text: "Consistent high-quality experience", size: "text-2xl", speed: 32 },
    { text: "Standardized financial processes", size: "text-lg", speed: 18 },
    { text: "Guaranteed pricing transparency", size: "text-3xl", speed: 26 },
    { text: "Trusted network nationwide", size: "text-4xl", speed: 33 },
    { text: "Quality care guaranteed", size: "text-2xl", speed: 24 },
  ];

  // Create six rows with different phrases
  const row1 = phrases.filter((_, i) => i % 6 === 0);
  const row2 = phrases.filter((_, i) => i % 6 === 1);
  const row3 = phrases.filter((_, i) => i % 6 === 2);
  const row4 = phrases.filter((_, i) => i % 6 === 3);
  const row5 = phrases.filter((_, i) => i % 6 === 4);
  const row6 = phrases.filter((_, i) => i % 6 === 5);

  const ScrollingRow = ({ phrases, delay = 0, className = "" }: {
    phrases: typeof row1;
    delay?: number;
    className?: string;
  }) => (
    <div className={`flex whitespace-nowrap overflow-hidden ${className}`}>
      <motion.div
        className="flex items-center gap-8 min-w-full"
        animate={{
          x: [0, -2000],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
          delay,
        }}
      >
        {/* Duplicate phrases for seamless loop */}
        {[...phrases, ...phrases, ...phrases].map((phrase, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
            transition={{ 
              duration: 0.8,
              delay: index * 0.1,
              ease: "easeOut"
            }}
            className={`${phrase.size} font-bold text-dental-blue whitespace-nowrap px-4`}
          >
            {phrase.text}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );

  return (
    <div className="py-16 overflow-hidden">
      <div className="space-y-8">
        {/* Row 1 - Moving right to left */}
        <ScrollingRow 
          phrases={row1} 
          delay={0}
          className="transform rotate-1"
        />
        
        {/* Row 2 - Moving right to left, different speed */}
        <ScrollingRow 
          phrases={row2} 
          delay={5}
          className="transform -rotate-1"
        />
        
        {/* Row 3 - Moving right to left, different speed */}
        <ScrollingRow 
          phrases={row3} 
          delay={10}
          className="transform rotate-0.5"
        />
        
        {/* Row 4 - Moving right to left */}
        <ScrollingRow 
          phrases={row4} 
          delay={15}
          className="transform -rotate-0.5"
        />
        
        {/* Row 5 - Moving right to left */}
        <ScrollingRow 
          phrases={row5} 
          delay={20}
          className="transform rotate-2"
        />
        
        {/* Row 6 - Moving right to left */}
        <ScrollingRow 
          phrases={row6} 
          delay={25}
          className="transform -rotate-2"
        />
      </div>
      
      {/* Gradient overlays to fade edges */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-800 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-800 to-transparent pointer-events-none" />
    </div>
  );
};