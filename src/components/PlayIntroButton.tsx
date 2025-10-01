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
      className="fixed bottom-6 right-6 z-50 text-dental-blue hover:text-dental-blue-dark transition-colors text-sm font-medium"
    >
      [play intro]
    </motion.button>
  );
};
