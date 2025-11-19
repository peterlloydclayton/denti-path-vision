import { motion } from 'framer-motion';

interface PlayIntroButtonProps {
  onClick: () => void;
}

export const PlayIntroButton = ({ onClick }: PlayIntroButtonProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      onClick={onClick}
      className="absolute bottom-6 mobile-landscape:bottom-3 right-[16%] mobile-landscape:right-[12%] z-[150] text-white hover:text-white/80 transition-colors text-sm mobile-landscape:text-xs font-medium"
    >
      [play intro]
    </motion.button>
  );
};
