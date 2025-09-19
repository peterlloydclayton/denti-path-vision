import { motion } from 'framer-motion';

export const AnimatedPhraseCloud = () => {
  const phrases = [
    // Main stats
    { text: "1,200+ Verified providers nationwide", size: "text-4xl", speed: 30 },
    { text: "4.8/5 Average provider rating", size: "text-3xl", speed: 25 },
    { text: "All Specialties covered", size: "text-5xl", speed: 35 },
    { text: "Same-Day Treatment starts available", size: "text-2xl", speed: 28 },
    
    // Supporting phrases for visual richness
    { text: "Pre-screened dental professionals", size: "text-xl", speed: 20 },
    { text: "Consistent high-quality experience", size: "text-2xl", speed: 32 },
    { text: "Standardized financial processes", size: "text-lg", speed: 18 },
    { text: "Guaranteed pricing transparency", size: "text-3xl", speed: 26 },
    { text: "Trusted network nationwide", size: "text-4xl", speed: 33 },
    { text: "Quality care guaranteed", size: "text-2xl", speed: 24 },
  ];

  // Create three rows with different phrases
  const row1 = phrases.filter((_, i) => i % 3 === 0);
  const row2 = phrases.filter((_, i) => i % 3 === 1);
  const row3 = phrases.filter((_, i) => i % 3 === 2);

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
          <span
            key={index}
            className={`${phrase.size} font-bold text-dental-blue opacity-80 hover:opacity-100 transition-opacity whitespace-nowrap px-4`}
          >
            {phrase.text}
          </span>
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
      </div>
      
      {/* Gradient overlays to fade edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-800 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-800 to-transparent pointer-events-none" />
    </div>
  );
};