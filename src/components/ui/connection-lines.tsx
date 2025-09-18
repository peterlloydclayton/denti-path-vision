import { motion } from 'framer-motion';

interface ConnectionLinesProps {
  cardPositions: Array<{ x: number; y: number }>;
  centerPosition: { x: number; y: number };
}

export const ConnectionLines = ({ cardPositions, centerPosition }: ConnectionLinesProps) => {
  return (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    >
      {cardPositions.map((cardPos, index) => {
        // Calculate connection path from center to card
        const startX = `${centerPosition.x}%`;
        const startY = `${centerPosition.y}%`;
        const endX = `${cardPos.x}%`;
        const endY = `${cardPos.y}%`;

        // Create a slight curve for more organic feel
        const midX = (centerPosition.x + cardPos.x) / 2;
        const midY = (centerPosition.y + cardPos.y) / 2;
        const controlX = `${midX + (Math.random() - 0.5) * 5}%`;
        const controlY = `${midY + (Math.random() - 0.5) * 5}%`;

        const pathData = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;

        return (
          <g key={index}>
            {/* Base connection line */}
            <motion.path
              d={pathData}
              stroke="hsl(var(--border))"
              strokeWidth="1"
              fill="none"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.3 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 1.2, 
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            />

            {/* Animated data flow */}
            <motion.path
              d={pathData}
              stroke={index % 2 === 0 ? "hsl(var(--dental-blue))" : "hsl(var(--dental-lavender))"}
              strokeWidth="2"
              fill="none"
              strokeDasharray="8 16"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 0],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.5
              }}
            />

            {/* Data pulse dots */}
            <motion.circle
              r="3"
              fill={index % 2 === 0 ? "hsl(var(--dental-blue))" : "hsl(var(--dental-lavender))"}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.3
              }}
            >
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                begin={`${index * 0.5}s`}
              >
                <mpath href={`#path-${index}`} />
              </animateMotion>
            </motion.circle>

            {/* Hidden path for animateMotion */}
            <path
              id={`path-${index}`}
              d={pathData}
              stroke="none"
              fill="none"
            />
          </g>
        );
      })}
    </svg>
  );
};